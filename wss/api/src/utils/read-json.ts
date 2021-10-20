import fs from 'fs';
import beautifyJson from './beautify-json';

export default (path: string): string => (
  beautifyJson(fs.readFileSync(`/srv/db/${path}.json`))
);
