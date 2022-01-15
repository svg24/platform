import fastify from 'fastify';
import type { Constructor } from 'types/server';

export const server = new (function Server(this: Constructor) {
  this.options = {
    host: process.env.SERVER_HOST,
    port: process.env.SERVER_PORT,
  };
  this.inst = fastify({ logger: false });

  this.listen = async () => {
    try {
      await this.inst.listen(this.options.port, this.options.host);
    } catch (err) {
      throw new Error(err as string);
    }
  };

  this.beatify = (value) => JSON.stringify(value, null, 2);

  this.ruin = (error) => this.beatify({
    error,
    docs: 'https://github.com/svg24/platform/blob/main/docs/api.http',
  });
} as any as { new (): Constructor })();
