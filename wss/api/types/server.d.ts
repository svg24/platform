import type http from 'http';
import type { FastifyInstance } from 'fastify';

declare namespace Server {
  function beatify(val: any): string;
  const inst: FastifyInstance<http.Server, http.IncomingMessage, http.ServerResponse>;
  function listen(): Promise<void>;
  const options: {
    host: string;
    port: string;
  };
}

export = Server;
