import type Content from 'types/content';
import type Server from 'types/server';
import { server } from '../../../core';
import { toBad } from '../../../utils';
import schema from './schema.json';

export function addRoute(this: typeof Content, inst: typeof Server.inst): void {
  inst.route<{ Params: Content.RouteParameters }>({
    ...JSON.parse(JSON.stringify(schema)),
    handler: async (req, rep) => {
      try {
        const content = await this.getContent(req.params.id, req.params.name);

        rep.header('Content-Type', 'text/html; charset=utf-8');
        rep.send(content);
      } catch (error) {
        rep.send(server.beatify(toBad(error)));
      }
    },
  });
}
