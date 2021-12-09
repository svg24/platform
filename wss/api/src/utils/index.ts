export function removeExtension(file: string): string {
  return file.replace('.svg', '');
}

export function toBad(error: unknown): { docs: string; error: unknown } {
  return {
    error,
    docs: 'https://github.com/svg24/platform/blob/main/wss/api/svg24.md',
  };
}

export function toComponentName(name: string): string {
  return name[0]?.toUpperCase() + removeExtension(name
    .slice(1)
    .replace(/-(\w)/g, (_, char) => (char.toUpperCase())));
}

export function toReactJS(name: string, jsx: string): string {
  return `export const ${name} = (props) => (\n${
    jsx.replace(/<svg (.*?)>/, '<svg $1 {...props}>')
  }\n);`;
}

export function toVueJS(name: string, html: string): string {
  return `<template>\n${html}\n</template>\n\nexport default {\n  name:${name}\n};`;
}

export function toReactTS(name: string, jsx: string): string {
  return `export const ${name} = (props: React.ComponentProps<'svg'>): JSX.Element => (\n${
    jsx.replace(/<svg (.*?)>/, '<svg $1 {...props}>')
  }\n);`;
}

export function toURL(path: string): string {
  return `https://api.svg24.dev/v1/content/${path}`;
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
