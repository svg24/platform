import { server } from '../../../core';
import type { Companies } from '../types';
import schema from './schema.json';

export function addIndex(this: Companies, inst: typeof server.inst): void {
  inst.route({
    ...JSON.parse(JSON.stringify(schema)),
    handler: async () => {
      const data = await this.model.find();

      return server.beatify({ data });
    },
  });
}
