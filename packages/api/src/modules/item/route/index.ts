import type { Item, Server } from 'types';
import { server } from '../../../core';
import { categories } from '../../categories';
import { companies } from '../../companies';
import { list } from '../../list';
import schema from './schema.json';

export function addRoute(
  this: Item.Constructor,
  inst: Server.ConstructorInstance,
): void {
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
            category: await categories.find(item.category),
            company: await companies.find(item.company),
            id: item.id,
            name: item.name,
            product: item.product,
            usage: item.usage,
          },
        })));

        return server.beatify(res[0]);
      } catch (error) {
        return server.ruin(error);
      }
    },
  });
}
