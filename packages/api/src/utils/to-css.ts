export function toCSS(buf: Buffer): string {
  return 'background-image: '
    + `url('data:image/svg+xml;base64,${buf.toString('base64')}') `
    + 'no-repeat center center / contain;';
}
