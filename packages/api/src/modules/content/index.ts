import { promises as fs } from 'fs';
import type { Content } from 'types';
import type { Constructor } from 'types/content';
import { db, server } from '../../core';
import schema from './schema.json';

export const content = new (function Content(this: Constructor) {
  this.options = {
    prefix: 'content',
  };

  this.plugin = async (inst) => {
    inst.route<{ Params: Content.RouteParameters }>({
      ...JSON.parse(JSON.stringify(schema)),
      handler: async ({ params }, rep) => {
        try {
          const buf = await fs
            .readFile(`${db.options.logos}/${params.id}/${params.name}.svg`);

          rep.header('Content-Type', 'text/html; charset=utf-8');
          rep.send(buf.toString());
        } catch (error) {
          rep.send(server.ruin(error));
        }
      },
    });
  };
} as any as { new (): Constructor })();
