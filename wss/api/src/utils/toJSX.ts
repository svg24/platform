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
