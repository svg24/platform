export function escapeString(string: string): string {
  return JSON.stringify(string).slice(1, -1).replace(/\s+/g, ' ');
}
