import { promises as fs } from 'fs';
import mongoose from 'mongoose';
import type { Constructor } from 'types/list';
import { db } from '../../core';
import { getVersion } from '../../utils';
import { addRoute } from './route';

export const list = new (function List(this: Constructor) {
  this.schema = new mongoose.Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    company: { type: String, required: true },
    category: { type: String, required: true },
    date: { type: String, required: true },
    src: { type: String, required: true },
  }, {
    collection: 'logos',
  });
  this.options = {
    prefix: 'list',
  };
  this.model = mongoose.model('List', this.schema);

  this.plugin = async (inst) => {
    addRoute.call(this, inst);
  };

  this.getDataItem = async (item) => {
    const dir = `${db.options.logos}/${item.id}`;
    const files = await fs.readdir(dir);
    const latest = files.reduce((acc, cur) => {
      const version = getVersion(cur);
      return version > acc.version
        ? {
          version,
          id: cur,
        }
        : acc;
    }, {
      id: '',
      version: 0,
    });
    const buf = await fs.readFile(`${dir}/${latest.id}`);

    return {
      hasMore: files.length > 1,
      id: item.id,
      latest: buf.toString(),
      name: item.name,
    };
  };
} as any as { new (): Constructor })();
