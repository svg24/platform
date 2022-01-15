export function getVersion(name: string): number {
  const match = name.match(/.+-v(.*).svg/);
  return match && match[1] ? (new Date(match[1])).getTime() : 0;
}
