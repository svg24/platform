import type http from 'http';
import type { FastifyInstance } from 'fastify';
import fastify from 'fastify';

interface Server {
  beatify: (val: any) => string;
  inst: FastifyInstance<http.Server, http.IncomingMessage, http.ServerResponse>;
  listen: () => Promise<void>;
  opts: {
    host: string;
    port: string;
  };
}

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
