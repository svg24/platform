import fs from 'fs';

export const beautifyJson = (buf: Buffer): string => (
  JSON.stringify(JSON.parse(buf.toString()), null, 2)
);

export const readJson = (path: string): string => (
  beautifyJson(fs.readFileSync(`/srv/db/${path}.json`))
);
