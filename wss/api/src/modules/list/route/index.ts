import type { List, ListRouteQuery } from 'types/list';
import { db, server } from '../../../core';
import { toBad } from '../../../utils';
import schema from './schema.json';

const DEFAULT_LIMIT = 20;
const DEFAULT_SKIP = 0;
const DEFAULT_SORT_BY = 'name';
const DEFAULT_SORT_METHOD = 'asc';

export function addRoute(this: List, inst: typeof server.inst): void {
  inst.route<{ Querystring: ListRouteQuery }>({
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
        ...category ? { category: new RegExp(category, 'i') } : {},
        ...name ? { name: new RegExp(name, 'i') } : {},
        ...company ? { company: new RegExp(company, 'i') } : {},
      };

      const options = {
        lean: true,
        limit: multiplier ? multiplier * DEFAULT_LIMIT : DEFAULT_LIMIT,
        get skip() {
          return page ? (page - 1) * options.limit : DEFAULT_SKIP;
        },
        sort: {
          [sortBy || DEFAULT_SORT_BY]: DEFAULT_SORT_METHOD,
        },
      };

      try {
        const meta = {
          length: {
            total: await this.model.find(filter, ['_id']).count(),
            get current() {
              const cur = options.skip + options.limit;

              return cur > meta.length.total ? meta.length.total : cur;
            },
          },
          page: {
            get isNext() {
              return meta.length.total - meta.length.current > 0;
            },
            get next() {
              return meta.page.isNext
                ? Math.ceil(meta.length.current / DEFAULT_LIMIT) + 1
                : null;
            },
          },
        };

        const items = await this.model.find(filter, ['id', 'name'], options);
        const data = await Promise.all(items.map(async (item) => ({
          id: item.id,
          name: item.name,
          ...await db.list.getDataItem(item.id),
        })));

        return server.beatify({ data, meta });
      } catch (error) {
        return server.beatify(toBad(error));
      }
    },
  });
}
