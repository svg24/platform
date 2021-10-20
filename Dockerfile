#
# DB deps
#

FROM alpine:3.14 as db-deps

ENV COLLECTIONS=logos

RUN \
  # Install deps
  apk add --no-cache --virtual .deps \
    curl \
    jq \
  # Download collections
  && cd /srv \
    && curl -LSs https://github.com/vanyauhalin/svg24/tarball/db | tar zx \
    && find . -depth -name vanyauhalin-svg24-* -exec mv {} db \; \
    && cd /srv/db \
      && for cl in $COLLECTIONS; do \
        cd /srv/db/$c \
        && echo $(jq -r '.[]' $cl.json) > $c.json; done

#
# DB
#

FROM mongo:5.0.3 as db

COPY --from=db-deps /srv/db /srv/db
COPY ci/db-init.sh /docker-entrypoint-initdb.d/init.sh

RUN chmod +x /docker-entrypoint-initdb.d/init.sh

#
# Node
#

FROM node:16-alpine3.14 as node

ENV \
  TERM=xterm-256color \
  USER_NAME=app \
  USER_UID=1001 \
  GROUP_NAME=docker \
  GROUP_GID=999

RUN \
  # Create docker group
  delgroup ping && addgroup -g 998 ping \
  && addgroup -g $GROUP_GID $GROUP_NAME \
  # Create app user
  && mkdir -p /home/$USER_NAME \
  && adduser -s /bin/sh -D -u $USER_UID $USER_NAME \
  && chown -R $USER_NAME:$USER_NAME /home/$USER_NAME \
  && addgroup $USER_NAME $GROUP_NAME \
  # Create app dir
  && mkdir -p /srv \
  && chown -R $USER_NAME:$USER_NAME /srv

#
# API deps
#

FROM node as api-deps

WORKDIR /srv/api

COPY wss/api/package.json .

RUN npm i

COPY wss/api .

#
# API
#

FROM node as api

ARG NODE_ENV

COPY --from=api-deps /srv/api /srv/api

RUN \
  chown -R $USER_NAME:$USER_NAME /srv/api \
  && if [ "$NODE_ENV" = "production" ]; then cd /srv/api && npm run test; fi

#
# Brotli
#

FROM alpine:3.14 as brotli

ENV \
  NGINX_VERSION=1.21.3 \
  # NGX_BROTLI_VERSION=1.0.9
  NGX_BROTLI_COMMIT=9aec15e2aa6feea2113119ba06460af70ab3ea62

RUN \
  # Install deps
  apk add --no-cache --virtual .deps \
    curl \
    gcc \
    git \
    libc-dev \
    make \
    pcre-dev \
    zlib-dev \
  # Nginx dirs
  && mkdir -p /usr/lib/nginx/modules \
  && mkdir -p /usr/local/nginx/modules \
  # Download srcs
  && mkdir /usr/tmp \
  && cd /usr/tmp \
    && curl -LSs \
      https://nginx.org/download/nginx-$NGINX_VERSION.tar.gz \
      | tar zx \
    && mkdir ngx_brotli-$NGX_BROTLI_COMMIT \
    && cd ngx_brotli-$NGX_BROTLI_COMMIT \
      && git clone --recursive https://github.com/google/ngx_brotli.git . \
      && git checkout $NGX_BROTLI_COMMIT \
      && git reset --hard \
    # Add module
    && cd ../nginx-$NGINX_VERSION \
      && ./configure \
        --with-compat \
        --add-dynamic-module=../ngx_brotli-$NGX_BROTLI_COMMIT \
      && make modules \
      && cp ./objs/*.so /usr/lib/nginx/modules

#
# Nginx
#

FROM nginx:1.21.3-alpine as nginx

ARG DOMAIN

COPY --from=brotli /usr/lib/nginx/modules /usr/lib/nginx/modules
COPY --from=brotli /usr/local/nginx/modules /usr/local/nginx/modules
COPY nginx/nginx.conf /etc/nginx/nginx.conf

RUN \
  mkdir -p /etc/nginx/sites-available/ \
  && mkdir -p /etc/nginx/sites-enabled/ \
  && touch /etc/nginx/sites-available/$DOMAIN.conf \
  && ln -s /etc/nginx/sites-available/$DOMAIN.conf /etc/nginx/sites-enabled/
