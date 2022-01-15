import type { FastifySchema } from 'fastify';
import mongoose from 'mongoose';
import type { Server, Simple } from 'types';
import { server } from '../core';

const DEFAULT_SORT_BY = 'name';
const DEFAULT_SORT_METHOD = 'asc';

const schema: FastifySchema = {
  response: {
    200: {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          properties: {
            ...Object.fromEntries([
              'A', 'B', 'C', 'D', 'E', 'F', 'G',
              'H', 'I', 'J', 'K', 'L', 'M', 'N',
              'O', 'P', 'Q', 'R', 'S', 'T', 'U',
              'V', 'W', 'X', 'Y', 'Z',
            ].map((char) => ([char, {
              type: 'array',
              items: {
                id: { type: 'string' },
                name: { type: 'string' },
              },
            }]))),
          },
        },
        meta: {
          type: 'object',
        },
      },
    },
  },
};

function addRoute(
  this: Simple.Constructor,
  inst: Server.ConstructorInstance,
): void {
  inst.route({
    schema,
    method: 'GET',
    url: '/',
    handler: async () => {
      try {
        const raw = await this.model.find({}, ['id', 'name'], {
          sort: { [DEFAULT_SORT_BY]: DEFAULT_SORT_METHOD },
        });
        const data = raw.reduce((acc, { id, name }) => {
          const first = name[0]?.toUpperCase();
          if (first) acc[first] = [...acc[first] || [], { id, name }];
          return acc;
        }, {} as Simple.RouteResponseData);

        return server.beatify({
          data,
          meta: {},
        });
      } catch (error) {
        return server.ruin(error);
      }
    },
  });
}

export const createSimpleModule = (collection: string): Simple.Constructor => (
  new (function Simple(this: Simple.Constructor) {
    this.schema = new mongoose.Schema({
      id: { type: String, required: true },
      name: { type: String, required: true },
    }, {
      collection,
    });
    this.model = mongoose.model(collection.toUpperCase(), this.schema);
    this.options = {
      prefix: collection,
    };

    this.plugin = async (inst) => {
      addRoute.call(this, inst);
    };
    this.find = async (id) => {
      const items = await this.model.find({ id }, ['id', 'name']);
      return items[0] as Simple.Schema;
    };
  } as any as { new (): Simple.Constructor })()
);
