import type { Node } from 'types/node';

export const node = new (function (this: Node) {
  this.opts = {
    env: process.env.NODE_ENV,
  };
  this.isProd = this.opts.env === 'production';
} as any as { new (): Node })();
