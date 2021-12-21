export function toVueJS(name: string, html: string): string {
  return `<template>\n${html}\n</template>\n\nexport default {\n  name:${name}\n};`;
}
