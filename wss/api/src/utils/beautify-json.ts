export default (buf: Buffer): string => (
  JSON.stringify(JSON.parse(buf.toString()), null, 2)
);
