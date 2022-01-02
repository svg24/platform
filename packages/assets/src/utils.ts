import type { ServerResponse } from 'http';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

function showForbiddance(res: ServerResponse): void {
  res.writeHead(403);
  res.end('Access to the requested resource is forbidden', 'utf-8');
}

function showRequest(res: ServerResponse, type: string, data: Buffer): void {
  res.writeHead(200, { 'Content-type': type });
  res.end(data, 'utf-8');
}

function getRootPath(): string {
  return dirname(fileURLToPath(import.meta.url)).replace('src', '');
}

export {
  getRootPath,
  showForbiddance,
  showRequest,
};
