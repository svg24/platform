import type { Model, Schema } from 'mongoose';
import mongoose from 'mongoose';
import { db, server } from '../../core';
import indexSchema from './schema.json';

type ListItem = {
  category: string;
  company: string;
  date: string;
  id: string;
  name: string;
  src: string;
};

interface List {
  item: {
    model: Model<ListItem>;
    schema: Schema<ListItem>;
  };
  plugin: (inst: typeof server.inst) => void;
}

export const list = new (function (this: List) {
  const strReq = { type: String, required: true };

  this.item.schema = new mongoose.Schema<ListItem>({
    id: strReq,
    name: strReq,
    company: strReq,
    category: strReq,
    date: strReq,
    src: strReq,
  }, { collection: db.opts.col });
  this.item.model = mongoose.model<ListItem>('ListItem', this.item.schema);

  const regIndex = (inst: typeof server.inst): void => {
    type IndexQuery = {
      category?: string;
      company?: string;
      multiplier?: number;
      name?: string;
      page?: number;
      sortBy?: 'date' | 'name';
    };

    const DEFAULT_LIMIT = 20;
    const DEFAULT_SKIP = 0;
    const DEFAULT_SORT_BY = 'name';
    const DEFAULT_SORT_METHOD = 'asc';

    inst.route<{
      Querystring: IndexQuery;
    }>({
      ...JSON.parse(JSON.stringify(indexSchema)),
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

        const length = {
          current: options.skip + options.limit,
          total: await this.item.model.find(filter).count(),
        };
        const meta = {
          length,
          page: {
            current: length.current / DEFAULT_LIMIT,
            isNext: length.total - length.current > 0,
          },
        };

        const items = await this.item.model.find(filter, null, options);
        const data = await Promise.all(items.map(async (item) => (
          Object.assign(item, { content: await db.getContent(item.id) })
        )));

        return server.beatify({ data, meta });
      },
    });
  };

  this.plugin = (inst) => {
    regIndex(inst);
  };
} as any as { new (): List })();
