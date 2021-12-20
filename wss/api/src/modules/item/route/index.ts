import type Item from 'types/item';
import type Server from 'types/server';
import { server } from '../../../core';
import { toBad } from '../../../utils';
import { list } from '../../list';
import { categories, companies } from '../../simple';
import schema from './schema.json';

export function addRoute(this: typeof Item, inst: typeof Server.inst): void {
  inst.route<{ Querystring: Item.RouteQuery }>({
    ...JSON.parse(JSON.stringify(schema)),
    handler: async (req) => {
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
          data: await this.getData(item.id),
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
