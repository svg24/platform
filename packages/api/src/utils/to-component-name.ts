export function toComponentName(name: string): string {
  return `${name[0]?.toUpperCase()}${name
    .slice(1)
    .replace(/-(\w)/g, (_, char) => (char.toUpperCase()))}`;
}
