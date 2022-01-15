export function toJSX(html: string): string {
  return html.replace(/([\w-]+)=/g, (str) => (str === 'viewBox='
    ? str
    : str.split('-')
      .map((char, idx) => (idx === 0
        ? char.toLowerCase()
        : `${char[0]?.toUpperCase()}${char.slice(1).toLowerCase()}`))
      .join('')));
}
