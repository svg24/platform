import type { List, Server } from 'types';
import { server } from '../../../core';
import schema from './schema.json';

const DEFAULT_LIMIT = 20;
const DEFAULT_SKIP = 0;
const DEFAULT_SORT_BY = 'name';
const DEFAULT_SORT_METHOD = 'asc';

function getFilterRegExp(str: string): RegExp {
  return new RegExp(str, 'i');
}

export function addRoute(
  this: List.Constructor,
  inst: Server.ConstructorInstance,
): void {
  inst.route<{ Querystring: List.RouteQuery }>({
    ...JSON.parse(JSON.stringify(schema)),
    handler: async (req) => {
      const {
        category,
        company,
        multiplier,
        name,
        page,
        sortBy,
      } = req.query;
      const filter = {
        ...category ? { category: getFilterRegExp(category) } : {},
        ...name ? { name: getFilterRegExp(name) } : {},
        ...company ? { company: getFilterRegExp(company) } : {},
      };
      const limit = multiplier ? multiplier * DEFAULT_LIMIT : DEFAULT_LIMIT;
      const skip = page ? (page - 1) * limit : DEFAULT_SKIP;
      const sort = { [sortBy || DEFAULT_SORT_BY]: DEFAULT_SORT_METHOD };

      try {
        const total = await this.model.find(filter).count();
        const current = skip + limit > total ? total : skip + limit;
        const hasNext = total - current > 0;
        const next = hasNext ? Math.ceil(current / DEFAULT_LIMIT) + 1 : null;
        const items = await this.model.find(filter, ['id', 'name'], {
          limit,
          skip,
          sort,
          lean: true,
        });
        const data = await Promise.all(items.map(async (item) => {
          const res = await this.getDataItem(item);
          return res;
        }));

        return server.beatify({
          data,
          meta: {
            length: {
              total,
              current,
            },
            page: {
              hasNext,
              next,
            },
          },
        });
      } catch (error) {
        return server.ruin(error);
      }
    },
  });
}
