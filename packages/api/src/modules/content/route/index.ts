import type { Content, Server } from 'types';
import { server } from '../../../core';
import schema from './schema.json';

export function addRoute(
  this: Content.Constructor,
  inst: Server.ConstructorInstance,
): void {
  inst.route<{ Params: Content.RouteParameters }>({
    ...JSON.parse(JSON.stringify(schema)),
    handler: async ({ params }, rep) => {
      try {
        rep.header('Content-Type', 'text/html; charset=utf-8');
        rep.send(await this.getContent(params.id, params.name));
      } catch (error) {
        rep.send(server.ruin(error));
      }
    },
  });
}
