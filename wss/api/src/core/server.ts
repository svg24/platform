import fastify from 'fastify';
import type Server from 'types/server';

export const server = new (function (this: typeof Server) {
  Object.defineProperties(this, {
    options: {
      enumerable: true,
      value: {
        host: process.env.API_HOST,
        port: process.env.API_PORT,
      },
    },
    inst: {
      enumerable: true,
      value: fastify({ logger: false }),
    },
  });

  this.listen = async () => {
    try {
      await this.inst.listen(this.options.port, this.options.host);
    } catch (err) {
      console.error(err);
      process.exit(0);
    }
  };
  this.beatify = (value) => JSON.stringify(value, null, 2);
} as any as { new (): typeof Server })();
