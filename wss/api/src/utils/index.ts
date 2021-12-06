export function toBad(error: unknown): { docs: string; error: unknown } {
  return {
    error,
    docs: 'https://github.com/svg24/platform/blob/main/wss/api/svg24.md',
  };
}

export function toComponentName(name: string): string {
  return name[0]?.toUpperCase() + name
    .slice(1)
    .replace(/-(\w)/g, (_, char) => (char.toUpperCase()))
    .replace('.svg', '');
}

export function toJSReact(name: string, jsx: string): string {
  return `export const ${name} = (props) => (\n${
    jsx.replace(/<svg (.*?)>/, '<svg $1 {...props}>')
  }\n)`;
}

export function toJSVue(name: string, html: string): string {
  return `<template>\n${html}\n</template>\n\nexport default {\n  name:${name}\n}`;
}

export function toTSReact(name: string, jsx: string): string {
  return `export const ${name} = (props: React.ComponentProps<'svg'>): JSX.Element => (\n${
    jsx.replace(/<svg (.*?)>/, '<svg $1 {...props}>')
  }\n)`;
}

export function toReactPackage(name: string): string {
  return `import { ${name} } from '@svg24/react';`;
}

export function toVuePackage(name: string): string {
  return `import { ${name} } from '@svg24/vue';`;
}

export function toCSS(base64: string): string {
  return 'background-image: '
    + `url('data:image/svg+xml;base64,${base64}') `
    + 'no-repeat center center / contain;';
}

export function toJSX(html: string): string {
  const jsx = html.replace(/([\w-]+)=/g, (str) => {
    if (str === 'viewBox=') return str;

    return str
      .split('-')
      .map((char, idx) => (idx === 0
        ? char.toLowerCase()
        : char[0]?.toUpperCase() + char.slice(1).toLowerCase()))
      .join('');
  });

  return jsx;
}
