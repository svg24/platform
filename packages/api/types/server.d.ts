import type http from 'http';
import type { FastifyInstance } from 'fastify';

declare namespace Server {
  interface Constructor {
    beatify(value: any): string;
    inst: ConstructorInstance;
    listen(): Promise<void>;
    options: {
      host: string;
      port: string;
    };
    ruin(error): string;
  }
  type ConstructorInstance = FastifyInstance<http.Server, http.IncomingMessage, http.ServerResponse>;
}

export = Server;
