<img
  align="right"
  width="75"
  height="75"
  alt="SVG24 logo"
  src="./packages/assets/src/images/logo.svg"
/>

# Platform

[![api status](https://github.com/svg24/platform/workflows/api/badge.svg)](https://github.com/svg24/platform/actions?query=workflow%3Aapi)
[![assets status](https://github.com/svg24/platform/workflows/assets/badge.svg)](https://github.com/svg24/platform/actions?query=workflow%3Aassets)
[![board status](https://github.com/svg24/platform/workflows/board/badge.svg)](https://github.com/svg24/platform/actions?query=workflow%3Aboard)
[![www status](https://github.com/svg24/platform/workflows/www/badge.svg)](https://github.com/svg24/platform/actions?query=workflow%3Awww)

Source files that make the collection interactive.

## Development

### Intro

Before starting development, we need to add project domains to the `/etc/hosts` file.

```
127.0.0.1 svg24.dev
127.0.0.1 api.svg24.dev
127.0.0.1 assets.svg24.dev
127.0.0.1 board.svg24.dev
```

We also need to create self hosted certificates to enable ssl. This can be done, for example, using the [mkcert](https://github.com/FiloSottile/mkcert).

```sh
mkcert \
  -cert-file etc/ssl/cert.pem \
  -key-file etc/ssl/privkey.pem \
  'svg24.dev' \
  '*.svg24.dev'
```

### Quick start

- Install dependencies with `yarn`;
- Create docker images and containers with `make dev`.

### Style guide

For the `.{cjs,d.ts,js,ts,tsx}` files, eslint is used based on airbnb rules with a few changes.

For the `.css` files, stylelint is used with custom rules. It should also be noted that despite the use of tailwindcss as a framework in the project, we use bem classes. This means that, for example, a `.css` file of the same name is added for each component. This approach has a number of advantages over writing tailwindcss classes in the layouts itself: we don't litter with long sets of classes and we are not limited to the framework classes.

## Workspaces

Before considering each workspace, it should be noted that the project is built like monorepo and all is done in docker containers.

```sh
$ docker images                   |   $ docker ps       |   $ docker network ls
REPOSITORY        TAG             |   NAMES             |   NAME
platform_api      latest          |   platform-api      |   platform_nginx
platform_assets   latest          |   platform-assets   |
platform_board    latest          |   platform-board    |
platform_db       latest          |   platform-db       |
platform_nginx    latest          |   platform-nginx    |
platform_root     latest          |   platform-root     |
platform_www      latest          |   platform-www      |
alpine            3.14            |
certbot/certbot   v1.7.0          |
mongo             5.0             |
nginx             1.21.3-alpine   |
node              16-alpine3.14   |
```

Let's take a look at the docker-compose (next as dc) files. Each stage has its own dc file (besides the [`dc-base`](./dc-base.yml), it is used, as you might guess, as the basis):

- [`dc-dev`](./dc-dev.yml) used to start development.
- [`dc-preview`](./dc-preview.yml) used to locally preview production build.
- [`dc-prod`](./dc-prod.yml) used to build for production.

| Workspace                                   | Stack                                 | Description                                                                                                                                                                                    | Doc                         | URL                                          |
| :------------------------------------------ | :------------------------------------ | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------- | :------------------------------------------- |
| [root](./package.json)                      | JavaScript, Docker, Vite, Gulp.       | This level contains the files necessary for development: docker, lint, gulp and other files. It should also be noted that all `devDependencies` have been moved to this level for convenience. |
| [api](./packages/api/package.json)          | TypeScript, Fastify.                  | This package is responsible for communicating with the database and local files.                                                                                                               | [api.http](./docs/api.http) | [api.svg24.dev](https://api.svg24.dev)       |
| [assets](./packages/assets/package.json)    | TypeScript, Tailwindcss.              | A place where assets are stored that are basic or just used in a few packages.                                                                                                                 |                             | [assets.svg24.dev](https://assets.svg24.dev) |
| [board](./packages/board/package.json)      | TypeScript, React, Mobx, Tailwindcss. | The largest part of the project is the UI for interacting with the collection.                                                                                                                 |                             | [board.svg24.dev](https://board.svg24.dev)   |
| [collection](./packages/board/package.json) |                                       | An empty package designed to optimize logos.                                                                                                                                                   |
| [www](./packages/www/package.json)          | Typescript, Nunjucks, Tailwindcss.    | Landing page as a presentation of the collection.                                                                                                                                              |                             | [svg24.dev](https://www.svg24.dev)           |

## Production

Coming soon...

## Policy

[MIT License](./LICENSE).
