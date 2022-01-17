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
RUN \
  apk add --no-cache --virtual .deps curl jq \
  && curl -LSso db.tar.gz https://github.com/svg24/collection/tarball/main \
  && mkdir db \
  && tar xf db.tar.gz -C db --strip-components 1 \
  && cd db/data \
    && for json in $(find . ! -path .); do \
      echo $(jq -r '.[]' $json) > $json; done

FROM mongo:5.0 as db
WORKDIR /srv
COPY --from=db-deps /srv/db db

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

FROM node-base as root-base
WORKDIR /srv
COPY .browserslistrc .browserslistrc
COPY .editorconfig .editorconfig
COPY .eslintignore .eslintignore
COPY .eslintrc.cjs .eslintrc.cjs
COPY .stylelintignore .stylelintignore
COPY .stylelintrc.json .stylelintrc.json
COPY gulpfile.js gulpfile.js
COPY package.json package.json
COPY tailwind.config.cjs tailwind.config.cjs
COPY tsconfig.base.json tsconfig.base.json
COPY vite.config.js vite.config.js
COPY yarn.lock yarn.lock

FROM root-base as root-dev
ENV NODE_ENV=development
WORKDIR /srv
COPY packages/api/package.json packages/api/package.json
COPY packages/assets/package.json packages/assets/package.json
COPY packages/board/package.json packages/board/package.json
COPY packages/www/package.json packages/www/package.json
RUN \
  yarn \
  && chown -R node:node .

#
# API
#

FROM node-base as api-dev
ENV NODE_ENV=development
WORKDIR /srv
COPY packages/api packages/api
RUN \
  apk add mongodb-tools \
  && chown -R node:node .
CMD yarn dev-api

FROM root-base as api-build
ENV NODE_ENV=production
WORKDIR /srv
COPY --from=api-dev /srv .
RUN \
  yarn install --production=false \
  # && yarn lint-editor \
  && yarn lint-ts-api \
  && yarn build-api

FROM node-base as api-prod
ENV NODE_ENV=production
WORKDIR /srv
COPY --from=api-build /srv/package.json package.json
COPY --from=api-build /srv/packages/api/dist api
COPY --from=api-build /srv/packages/api/package.json api/package.json
RUN \
  apk add mongodb-tools \
  && cd api \
  && yarn \
  && chown -R node:node .
CMD yarn prod-api

#
# Assets
#

FROM node-base as assets-dev
ENV NODE_ENV=development
WORKDIR /srv
COPY packages/assets packages/assets
RUN chown -R node:node .
CMD yarn dev-assets

FROM root-base as assets-build
ENV NODE_ENV=production
WORKDIR /srv
COPY --from=assets-dev /srv .
RUN \
  yarn install --production=false \
  # && yarn lint-editor \
  && yarn lint-css-assets \
  && yarn lint-ts-assets \
  && yarn build-assets

FROM node-base as assets-prod
ENV NODE_ENV=production
WORKDIR /srv
COPY --from=assets-build /srv/package.json package.json
COPY --from=assets-build /srv/packages/assets/dist assets
RUN chown -R node:node .
CMD yarn prod-assets

#
# Board
#

FROM node-base as board-dev
ENV NODE_ENV=development
WORKDIR /srv
COPY packages/board packages/board
RUN \
  mkdir node_modules \
  && chown -R node:node .
CMD yarn dev-board

FROM root-base as board-build
ENV NODE_ENV=production
WORKDIR /srv
COPY --from=board-dev /srv .
RUN \
  yarn install --production=false \
  # && yarn lint-editor \
  && yarn lint-css-board \
  && yarn lint-ts-board \
  && yarn build-board

FROM alpine-base as board-prod
WORKDIR /srv
COPY --from=board-build /srv/packages/board/dist board
RUN chown -R app:app .

#
# WWW
#

FROM node-base as www-dev
ENV NODE_ENV=development
WORKDIR /srv
COPY packages/www packages/www
RUN chown -R node:node .
CMD yarn dev-www

FROM root-base as www-build
ENV NODE_ENV=production
WORKDIR /srv
COPY --from=www-dev /srv .
RUN \
  yarn install --production=false \
  # && yarn lint-editor \
  && yarn lint-css-www \
  && yarn lint-ts-www \
  && yarn build-www

FROM alpine-base as www-prod
WORKDIR /srv
COPY --from=www-build /srv/packages/www/dist www
RUN chown -R app:app .

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
COPY etc/ssl/cert.pem /etc/ssl/certs/$DOMAIN.pem
COPY etc/ssl/privkey.pem /etc/ssl/private/$DOMAIN.pem
