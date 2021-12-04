import type { SimpleModule } from 'types/simple';
import { server } from '../../core';

const DEFAULT_SORT_BY = 'name';
const DEFAULT_SORT_METHOD = 'asc';

export function addRoute(this: SimpleModule, inst: typeof server.inst): void {
  inst.route({
    method: 'GET',
    url: '/',
    schema: {
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
          },
        },
      },
    },
    handler: async () => {
      const raw = await this.model.find({}, null, {
        sort: { [DEFAULT_SORT_BY]: DEFAULT_SORT_METHOD },
      });
      const data = raw.reduce((acc, cur) => {
        const first = cur.name[0]?.toUpperCase();

        if (first) acc[first] = [...acc[first] || [], cur];

        return acc;
      }, {} as { [key: string]: typeof raw[0][] });

      return server.beatify({ data });
    },
  });
}
