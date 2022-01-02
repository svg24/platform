#
# Alpine
#

FROM alpine:3.14 as alpine-base
ENV \
  TERM=xterm-256color \
  DOCKER_GROUP_NAME=docker \
  DOCKER_GROUP_GID=999 \
  USER_NAME=app \
  USER_UID=1001
RUN \
  # Create docker
  delgroup ping \
  && addgroup -g 998 ping \
  && addgroup -g $DOCKER_GROUP_GID $DOCKER_GROUP_NAME \
  # Create user
  && mkdir -p /home/$USER_NAME \
  && adduser -s /bin/sh -D -u $USER_UID $USER_NAME \
  && chown -R $USER_NAME:$USER_NAME /home/$USER_NAME \
  && addgroup $USER_NAME $DOCKER_GROUP_NAME \
  && mkdir -p /srv \
  && chown -R $USER_NAME:$USER_NAME /srv

#
# DB
#

FROM alpine-base as db-deps
WORKDIR /srv
ARG DB_TARBALL
RUN \
  apk add --no-cache --virtual .deps curl jq \
  && mkdir packages \
  && cd packages \
    && curl -LSso db.tar.gz $DB_TARBALL \
    && mkdir db \
    && tar xf db.tar.gz -C db --strip-components 1 \
    && cd db/data \
      && for json in $(find . ! -path .); do \
        echo $(jq -r '.[]' $json) > $json; done

FROM mongo:5.0 as db
ARG DB_TARBALL
WORKDIR /srv/packages/db
COPY --from=db-deps /srv/packages/db .

#
# Node
#

FROM node:16-alpine3.14 as node-base
WORKDIR /srv
ENV \
  DOCKER_GROUP_NAME=docker \
  DOCKER_GROUP_GID=999 \
  USER_NAME=node
RUN \
  # Create docker
  delgroup ping \
  && addgroup -g 998 ping \
  && addgroup -g $DOCKER_GROUP_GID $DOCKER_GROUP_NAME \
  # Add user
  && addgroup $USER_NAME $DOCKER_GROUP_NAME \
  && chown -R $USER_NAME:$USER_NAME .

#
# Root
#

FROM node-base as root
WORKDIR /srv
COPY .editorconfig .editorconfig
COPY .eslintignore .eslintignore
COPY .eslintrc.cjs .eslintrc.cjs
COPY package-lock.json package-lock.json
COPY package.json package.json
COPY tsconfig.base.json tsconfig.base.json
COPY tsconfig.json tsconfig.json
COPY packages/api/package.json packages/api/package.json
COPY packages/assets/package.json packages/assets/package.json
COPY packages/board/package.json packages/board/package.json
RUN \
  npm i \
  && rm -rf packages \
  && chown -R node:node .

#
# API
#

FROM node-base as api-deps
ARG NODE_ENV
WORKDIR /srv/packages/api
COPY packages/api .
RUN \
  apk add mongodb-tools \
  && chown -R node:node .

#
# Assets
#

FROM node-base as assets-deps
ARG NODE_ENV
WORKDIR /srv/packages/assets
COPY packages/assets .
RUN chown -R node:node .

#
# Board
#

FROM node-base as board-deps
ARG NODE_ENV
WORKDIR /srv/packages/board
COPY packages/board .
RUN \
  mkdir node_modules \
  && chown -R node:node /srv

#
# Nginx
#

FROM alpine-base as nginx-brotli
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
  && mkdir -p /srv/packages/nginx-brotli \
  && cd /srv/packages/nginx-brotli \
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

FROM nginx:1.21.3-alpine as nginx-base
COPY --from=nginx-brotli /usr/lib/nginx/modules /usr/lib/nginx/modules
COPY --from=nginx-brotli /usr/local/nginx/modules /usr/local/nginx/modules
COPY etc/nginx/base.conf /etc/nginx/nginx.conf
RUN mkdir -p /etc/nginx/sites

FROM nginx-base as nginx-dev
ARG DOMAIN
COPY etc/nginx/dev.conf /etc/nginx/sites/$DOMAIN.conf
COPY etc/ssl/cert.pem /etc/ssl/certs/$DOMAIN.pem
COPY etc/ssl/privkey.pem /etc/ssl/private/$DOMAIN.pem

FROM nginx-base as nginx-preview
ARG DOMAIN
COPY etc/nginx/preview.conf /etc/nginx/sites/$DOMAIN.conf

FROM nginx-base as nginx-prod
ARG DOMAIN
COPY etc/nginx/prod.conf /etc/nginx/sites/$DOMAIN.conf
COPY etc/nginx/ssl.conf /etc/nginx/snippets/ssl.conf
