import type List from 'types/list';
import type Server from 'types/server';
import { server } from '../../../core';
import { toBad } from '../../../utils';
import schema from './schema.json';

const DEFAULT_LIMIT = 20;
const DEFAULT_SKIP = 0;
const DEFAULT_SORT_BY = 'name';
const DEFAULT_SORT_METHOD = 'asc';

function getFilterRegExp(str: string): RegExp {
  return new RegExp(str, 'i');
}

export function addRoute(this: typeof List, inst: typeof Server.inst): void {
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
            get hasNext() {
              return meta.length.total - meta.length.current > 0;
            },
            get next() {
              return meta.page.hasNext
                ? Math.ceil(meta.length.current / DEFAULT_LIMIT) + 1
                : null;
            },
          },
        };

        const items = await this.model.find(filter, ['id', 'name'], options);
        const data = await Promise.all(items.map(async (item) => ({
          ...await this.getDataItem(item.id),
          id: item.id,
          name: item.name,
        })));

        return server.beatify({ data, meta });
      } catch (error) {
        return server.beatify(toBad(error));
      }
    },
  });
}
