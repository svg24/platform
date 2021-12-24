import { promises as fs } from 'fs';
import type TContent from 'types/content';
import { db } from '../../core';
import { addRoute } from './route';

export const content = new (function Content(this: typeof TContent) {
  Object.defineProperty(this, 'options', {
    enumerable: true,
    value: {
      prefix: 'content',
    },
  });
  this.plugin = async (inst) => {
    addRoute.call(this, inst);
  };

  this.getContent = async (id, name) => {
    const buf = await fs.readFile(`${db.options.local}/${id}/${name}.svg`);
    return buf.toString();
  };
} as any as { new (): typeof TContent })();
