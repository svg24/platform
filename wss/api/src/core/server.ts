import fastify, { FastifyInstance } from 'fastify';
import http from 'http';

export class Server {
  #opts = {
    port: process.env.API_PORT,
    host: process.env.API_HOST,
  }

  inst: FastifyInstance<
    http.Server,
    http.IncomingMessage,
    http.ServerResponse
  > = fastify({ logger: false })

  async listen(): Promise<void> {
    try {
      await this.inst.listen(this.#opts.port, this.#opts.host);
    } catch (err) {
      console.error(err);
      process.exit(0);
    }
  }

  static beatifyBody(value: unknown): string {
    return JSON.stringify(value, null, 2);
  }
}

export default new Server();
