import type { Item, ItemRouteQuery } from 'types/item';
import { db, server } from '../../../core';
import { toBad } from '../../../utils';
import { list } from '../../list';
import schema from './schema.json';

export function addRoute(this: Item, inst: typeof server.inst): void {
  inst.route<{ Querystring: ItemRouteQuery }>({
    ...JSON.parse(JSON.stringify(schema)),
    async handler(req) {
      try {
        const items = await list.model.find({
          id: req.query.id,
        }, null, {
          lean: true,
        });

        const res = await Promise.all(items.map(async (item) => ({
          data: await db.item.getData(item.id),
          meta: {
            category: item.category,
            company: item.company,
            date: (new Date(item.date)).getTime(),
            id: item.id,
            name: item.name,
            src: {
              product: item.src,
              usage: '',
            },
          },
        })));

        return server.beatify(res[0]);
      } catch (error) {
        return server.beatify(toBad(error));
      }
    },
  });
}
