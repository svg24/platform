import { existsSync, readFile, statSync } from 'fs';
import type { IncomingMessage, ServerResponse } from 'http';
import { parse } from 'path';
import { MimeTypes } from './constants';
import { showForbiddance, showRequest } from './utils';

export function listener(req: IncomingMessage, res: ServerResponse): void {
  if (!req.url) {
    showForbiddance(res);
    return;
  }

  const path = `packages/assets/data${req.url}`;

  if (!existsSync(path)) {
    showForbiddance(res);
    return;
  }

  if (statSync(path).isDirectory()) {
    showForbiddance(res);
    return;
  }

  readFile(path, (error, data) => {
    if (error) {
      showForbiddance(res);
      return;
    }

    const { ext } = parse(path);
    const type = MimeTypes[ext];

    if (!type) {
      showForbiddance(res);
      return;
    }

    showRequest(res, type, data);
  });
}
