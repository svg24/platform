import fastify from 'fastify';
import type { Server } from 'types/server';

export const server = new (function (this: Server) {
  this.opts = {
    host: process.env.API_HOST,
    port: process.env.API_PORT,
  };
  this.inst = fastify({ logger: false });

  this.listen = async () => {
    try {
      await this.inst.listen(this.opts.port, this.opts.host);
    } catch (err) {
      console.error(err);
      process.exit(0);
    }
  };
  this.beatify = (val) => JSON.stringify(val, null, 2);
} as any as { new (): Server })();
