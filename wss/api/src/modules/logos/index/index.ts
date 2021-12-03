import { db, server } from 'src/core';
import type { Logos, LogosIndexQuery } from 'types/logos';
import schema from './schema.json';

const DEFAULT_LIMIT = 20;
const DEFAULT_SKIP = 0;
const DEFAULT_SORT_BY = 'name';
const DEFAULT_SORT_METHOD = 'asc';

export function addIndex(this: Logos, inst: typeof server.inst): void {
  inst.route<{ Querystring: LogosIndexQuery }>({
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
      const limit = multiplier ? multiplier * DEFAULT_LIMIT : DEFAULT_LIMIT;
      const options = {
        limit,
        lean: true,
        skip: page ? (page - 1) * limit : DEFAULT_SKIP,
        sort: { [sortBy || DEFAULT_SORT_BY]: DEFAULT_SORT_METHOD },
      };

      const lengthCurrent = options.skip + options.limit;
      const lengthTotal = await this.model.find(filter).count();
      const length = {
        total: lengthTotal,
        current: lengthCurrent > lengthTotal ? lengthTotal : lengthCurrent,
      };
      const pageIsNext = length.total - length.current > 0;
      const meta = {
        length,
        page: {
          isNext: pageIsNext,
          next: pageIsNext
            ? Math.ceil(length.current / DEFAULT_LIMIT) + 1
            : null,
        },
      };

      const items = await this.model.find(filter, null, options);
      const data = await Promise.all(items.map(async (item) => (
        Object.assign(item, { content: await db.getContent(item.id) })
      )));

      return server.beatify({ data, meta });
    },
  });
}
