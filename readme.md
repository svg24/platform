# SVG24

**Warning:** at the moment everything described below is under development.

SVG24 is a collection of predictable optimized logos designed to be rendered at 24x24. Available on the [svg24.dev](https://svg24.dev), the database can be accessed through the [api.svg24.com](https://api.svg24.com/), sources located in the [db](https://github.com/vanyauhalin/svg24/tree/db) branch.

![Preview image](https://github.com/vanyauhalin/svg24/tree/main/docs/preview.jpg)

## Optimization

### Manually with Inkscape

- Collapse useless elements (e.g. `<doctype>`, `<metadata>`, `<g>`, `<title>`) and attributes (e.g. `id`, `stroke`, `fill`).
- Remove any `transform`'s.
- Correct `viewBox` to 24x24 and resize content to 20x20.
- Correct styles and convert colors to `#rrggbb` or `#rgb`.

### Automatically with SVGO

- Convert Path data to relative or absolute (whichever is shorter), convert one segment to another, trim useless delimiters, smart rounding, and much more.
- Convert some base shapes to `<path>`.
- Sort element attributes for epic readability.

## Support

Feel free suggest any logos to add to the collection via [email](mailto:vanyauhalin@gmail.com?subject=SVG24%20|%20New%20idea) or [issue](https://github.com/vanyauhalin/vanyauhalin.ru/issues). In addition, you can offer any ideas for project development.

## Policy

[MIT License](https://github.com/vanyauhalin/svg24/tree/main/LICENSE). All logos on the [svg24.dev](https://svg24.dev) (hence in the [db](https://github.com/vanyauhalin/svg24/tree/db) branch) are the property of their respective owners. If you believe that your copyright has been infringed, please contact me by [email](mailto:vanyauhalin@gmail.com?subject=SVG24%20|%20Copyright%20infringe).

## References

- [Inkscape](http://inkscape.org) — vector graphics editor.
- [SVGO](https://github.com/svg/svgo) — Node.js tool for optimizing SVG files.
