export function getPreview(componentName: string, html: string): string {
  return `/**\n* ![${componentName}](data:image/svg+xml;base64,${Buffer
    .from(html.replace('<svg', '<svg width="64" height="64"'))
    .toString('base64')
  })\n*/\n`;
}
