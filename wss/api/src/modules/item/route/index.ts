import type { Item, ItemRouteQuery } from 'types/item';
import { db, server } from '../../../core';
import { toBad } from '../../../utils';
import { list } from '../../list';
import { categories, companies } from '../../simple';
import schema from './schema.json';

export function addRoute(this: Item, inst: typeof server.inst): void {
  inst.route<{ Querystring: ItemRouteQuery }>({
    ...JSON.parse(JSON.stringify(schema)),
    async handler(req) {
      try {
        const items = await list.model.find({
          id: req.query.id,
        }, [
          'category',
          'company',
          'date',
          'id',
          'name',
          'src',
        ], {
          lean: true,
        });

        const res = await Promise.all(items.map(async (item) => ({
          data: await db.modules.item.getData(item.id),
          meta: {
            category: (await categories.model.find({
              id: item.category,
            }, ['id', 'name']))[0],
            company: (await companies.model.find({
              id: item.company,
            }, ['id', 'name']))[0],
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
