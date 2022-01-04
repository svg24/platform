<p align="center">
  <img src="https://raw.githubusercontent.com/svg24/.github/main/platform.svg" alt="SVG24">
</p>

**Warning:** at the moment ever„„ything described below is under development.

| URL                                          | Package                                  |
| :------------------------------------------- | :--------------------------------------- |
| [api.svg24.dev](https://api.svg24.dev)       | [api](./packages/api/package.json)       |
| [assets.svg24.dev](https://assets.svg24.dev) | [assets](./packages/assets/package.json) |
| [board.svg24.dev](https://board.svg24.dev)   | [board](./packages/board/package.json)   |
| [www.svg24.dev](https://www.svg24.dev)       | [www](./packages/www/package.json)       |

## Development

`cat /etc/hosts`

```conf
# SVG24
127.0.0.1 svg24.dev
127.0.0.1 api.svg24.dev
127.0.0.1 assets.svg24.dev
127.0.0.1 board.svg24.dev
```

```sh
mkcert \
  -cert-file ./etc/ssl/certs/svg24.dev.pem \
  -key-file ./etc/ssl/private/svg24.dev.pem \
  "svg24.dev" \
  "*.svg24.dev"
```

## Policy

[MIT License](./LICENSE).
