import mongoose from 'mongoose';
import { DB, server, Server } from '../core';

interface Logo {
  name: string;
  slug: string;
  category: string;
  date: Date;
  src: string;
}

export class Logos {
  #schema = new mongoose.Schema<Logo>({
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    src: {
      type: String,
      required: true,
    },
  }, {
    collection: 'logos',
  })

  #model = mongoose.model<Logo>('Logo', this.#schema)

  opts = {
    prefix: this.#model.collection.name,
  }

  plugin = async (inst: typeof server.inst): Promise<void> => {
    this.#regHome(inst);
    this.#regList(inst);
  }

  #regHome(inst: typeof server.inst): void {
    inst.route({
      method: 'GET',
      url: '/',
      schema: {
        response: {
          200: {
            type: 'object',
            properties: {
              total: {
                type: 'number',
              },
            },
          },
        },
      },
      handler: async () => {
        const total = await this.#model.count();

        return Server.beatifyBody({
          total,
        });
      },
    });
  }

  #regList(inst: typeof server.inst): void {
    interface ListQuery {
      name?: string,
      category?: string,
      page?: number,
      sortBy?: 'date' | 'name',
    }

    const DEFAULT_SKIP = 0;
    const DEFAULT_LIMIT = 20;
    const DEFAULT_SORT_BY = 'name';
    const DEFAULT_SORT_METHOD = 'asc';

    inst.route<{
      Querystring: ListQuery,
    }>({
      method: 'GET',
      url: '/list',
      schema: {
        querystring: {
          name: {
            type: 'string',
          },
          category: {
            type: 'string',
          },
          page: {
            type: 'number',
          },
          sortBy: {
            type: 'string',
            enum: [
              'date',
              'name',
            ],
          },
        },
        response: {
          200: {
            type: 'object',
            properties: {
              data: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    _id: {
                      type: 'string',
                    },
                    name: {
                      type: 'string',
                    },
                    slug: {
                      type: 'string',
                    },
                    category: {
                      type: 'string',
                    },
                    date: {
                      type: 'string',
                    },
                    src: {
                      type: 'string',
                    },
                    content: {
                      type: 'array',
                      items: {
                        type: 'string',
                      },
                    },
                  },
                },
              },
              isMore: {
                type: 'boolean',
              },
            },
          },
        },
      },
      handler: async (req) => {
        const limit = DEFAULT_LIMIT;
        const skip = req.query.page
          ? (req.query.page - 1) * limit
          : DEFAULT_SKIP;
        const filter = {
          ...req.query.name ? { name: new RegExp(req.query.name, 'i') } : {},
        };
        const items = await this.#model.find(filter, null, {
          limit,
          skip,
          lean: true,
          sort: {
            [req.query.sortBy || DEFAULT_SORT_BY]: DEFAULT_SORT_METHOD,
          },
        });
        const data = await Promise.all(items.map(async (item) => {
          const { name } = this.#model.collection;
          const content = await DB.getContent(name, item.slug);

          return Object.assign(item, { content });
        }));
        const count = await this.#model.find(filter).count();

        return Server.beatifyBody({
          data,
          isMore: count - (skip + limit) > 0,
        });
      },
    });
  }
}

export default new Logos();
