import type http from 'http';
import type { FastifyInstance } from 'fastify';

export interface Server {
  beatify: (val: any) => string;
  inst: FastifyInstance<http.Server, http.IncomingMessage, http.ServerResponse>;
  listen: () => Promise<void>;
  opts: {
    host: string;
    port: string;
  };
}
