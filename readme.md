# svg24

**Warning:** at the moment everything described below is under development.

svg24 — is compilation of SVG content according to the following rules:

- No `transform`.
- `viewBox="0 0 24 24"` with 2 of the content padding.

The site is available at [svg24.com](https://svg24.com/), the dashboard is at [board.svg24.com](https://board.svg24.com/), and the database can be accessed through [api.svg24.com](https://api.svg24.com/).

## Install

### Editor

When developing in VSCode, it is recommended to add `.vscode/settings.json` to the root of the project:

```json
{
  "eslint.workingDirectories": [
    "api",
    "board",
    "www"
  ],
  "typescript.tsdk": "node_modules/typescript/lib"
}
```

### Development

```
make dev
```

### Production

```
make prod
```

## Api

### Logos collection

```json
{
  "_id": "",
  "meta": {
    "name": "",
    "category": "",
    "tags": [""],
    "date": "",
    "src": "",
  },
  "versions": [{
    "date": "",
    "content": "",
    "colors": [""],
  }],
  "stats": {
    "downloads": 0,
  }
}
```

## References

- [logos](https://github.com/gilbarbara/logos) — huge collection of SVG logos.
