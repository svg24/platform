#
# DB deps
#

FROM alpine:3.14 as db-deps
ARG DB_COLLECTION
ARG DB_TARBALL

RUN \
  apk add --no-cache --virtual .deps curl jq \
  # Download collections
  && cd /srv \
    && curl -LSso db.tar.gz $DB_TARBALL \
    && mkdir db \
    && tar xf db.tar.gz -C db --strip-components 1 \
    && echo $(jq -r '.[]' db/data/$DB_COLLECTION) > db/data/$DB_COLLECTION

#
# DB
#

FROM mongo:5.0 as db
ARG DB_COLLECTION
ARG DB_TARBALL
WORKDIR /srv/db

COPY --from=db-deps /srv/db .

#
# Base
#

FROM alpine:3.14 as base
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

FROM node:16-alpine3.14 as api-deps
ARG NODE_ENV
WORKDIR /srv/api

COPY wss/api .
RUN \
  apk add mongodb-tools \
  && if [ "$NODE_ENV" = "production" ]; \
    then \
      npm i --include dev \
      && npm run test \
      && npm run build; \
    else \
      npm i; \
    fi \
  && chown -R node:node .

#
# API prod
#

FROM node:16-alpine3.14 as api-prod
ARG NODE_ENV
WORKDIR /srv/api

COPY --from=api-deps /srv/api/dist dist
COPY wss/api/.nodemon-prod.json .nodemon-prod.json
COPY wss/api/package.json package.json
RUN \
  apk add mongodb-tools \
  && npm i \
  && chown -R node:node .

#
# Board deps
#

FROM node:16-alpine3.14 as board-deps
ARG NODE_ENV
WORKDIR /srv/board

COPY wss/board .
RUN \
  if [ "$NODE_ENV" = "production" ]; \
    then \
      npm i --include dev \
      && npm run test \
      && npm run build; \
    else \
      npm i ; \
    fi \
  && chown -R node:node .

#
# Board prod
#

FROM base as board-prod
ARG NODE_ENV
WORKDIR /srv/board

COPY --from=board-deps /srv/board/dist .
RUN chown -R $USER_NAME:$USER_NAME .

#
# Nginx brotli
#

FROM alpine:3.14 as nginx-brotli
ENV \
  NGINX_VERSION=1.21.3 \
  # NGX_BROTLI_VERSION=1.0.9
  NGX_BROTLI_COMMIT=9aec15e2aa6feea2113119ba06460af70ab3ea62

RUN \
  # Install deps
  apk add --no-cache --virtual .deps \
    curl gcc git libc-dev make pcre-dev zlib-dev \
  # Nginx dirs
  && mkdir -p /usr/lib/nginx/modules \
  && mkdir -p /usr/local/nginx/modules \
  # Download srcs
  && mkdir /srv/nginx-brotli \
  && cd /srv/nginx-brotli \
    && curl -LSs \
      https://nginx.org/download/nginx-$NGINX_VERSION.tar.gz | tar zx \
    && git clone --recursive https://github.com/google/ngx_brotli.git \
    && cd ngx_brotli \
      && git checkout $NGX_BROTLI_COMMIT \
      && git reset --hard \
    # Add module
      && cd ../nginx-$NGINX_VERSION \
        && ./configure \
          --with-compat \
          --add-dynamic-module=../ngx_brotli \
        && make modules \
        && cp ./objs/*.so /usr/lib/nginx/modules

#
# Nginx
#

FROM nginx:1.21.3-alpine as nginx
ARG DOMAIN
ARG IS_DEV
ARG IS_PREV
ARG IS_PROD
WORKDIR /srv/nginx

COPY --from=nginx-brotli /usr/lib/nginx/modules /usr/lib/nginx/modules
COPY --from=nginx-brotli /usr/local/nginx/modules /usr/local/nginx/modules
COPY nginx/* .
RUN \
  mv base.conf /etc/nginx/nginx.conf \
  && mkdir -p /etc/nginx/sites \
  && SITE_CONFIG=/etc/nginx/sites/$DOMAIN.conf \
  && if [ "$IS_DEV" = true ]; then mv dev.conf $SITE_CONFIG; fi \
  && if [ "$IS_PREV" = true ]; then mv prev.conf $SITE_CONFIG; fi \
  && if [ "$IS_PROD" = true ]; \
    then \
      mv prod.conf $SITE_CONFIG \
      && mkdir -p /etc/nginx/snippets \
      && mv ssl.conf /etc/nginx/snippets; \
    fi \
  && rm -rf /srv/nginx
