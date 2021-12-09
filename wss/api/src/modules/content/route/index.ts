import type { Content, ContentRouteParameters } from 'types/content';
import { db, server } from '../../../core';
import { toBad } from '../../../utils';
import schema from './schema.json';

export function addRoute(this: Content, inst: typeof server.inst): void {
  inst.route<{ Params: ContentRouteParameters }>({
    ...JSON.parse(JSON.stringify(schema)),
    async handler(req, rep) {
      try {
        const content = await db.modules.content
          .get(req.params.id, req.params.name);

        rep.header('Content-Type', 'text/html; charset=utf-8');
        rep.send(content);
      } catch (error) {
        rep.send(server.beatify(toBad(error)));
      }
    },
  });
}
