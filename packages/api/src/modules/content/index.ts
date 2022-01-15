import { promises as fs } from 'fs';
import type { Constructor } from 'types/content';
import { db } from '../../core';
import { addRoute } from './route';

export const content = new (function Content(this: Constructor) {
  this.options = {
    prefix: 'content',
  };

  this.plugin = async (inst) => {
    addRoute.call(this, inst);
  };
  this.getContent = async (id, name) => {
    const buf = await fs.readFile(`${db.options.logos}/${id}/${name}.svg`);
    return buf.toString();
  };
} as any as { new (): Constructor })();
