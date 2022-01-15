export function toCSS(base64: string): string {
  return 'background-image: '
    + `url('data:image/svg+xml;base64,${base64}') `
    + 'no-repeat center center / contain;';
}
