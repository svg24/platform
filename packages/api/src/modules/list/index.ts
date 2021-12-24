import { promises as fs } from 'fs';
import mongoose from 'mongoose';
import type TList from 'types/list';
import { db } from '../../core';
import { addRoute } from './route';

export const list = new (function List(this: typeof TList) {
  Object.defineProperties(this, {
    schema: {
      enumerable: true,
      value: new mongoose.Schema({
        id: { type: String, required: true },
        name: { type: String, required: true },
        company: { type: String, required: true },
        category: { type: String, required: true },
        date: { type: String, required: true },
        src: { type: String, required: true },
      }, {
        collection: 'logos',
      }),
    },
    options: {
      enumerable: true,
      value: {
        prefix: 'list',
      },
    },
  });
  Object.defineProperty(this, 'model', {
    enumerable: true,
    value: mongoose.model('List', this.schema),
  });
  this.plugin = async (inst) => {
    addRoute.call(this, inst);
  };

  this.getDataItem = async (id) => ({
    hasMore: await this.getDataItemHasMore(id),
    latest: await this.getDataItemLatest(id),
  });
  this.getDataItemHasMore = async (id) => {
    const dirents = await fs.readdir(`${db.options.local}${id}`, {
      withFileTypes: true,
    });
    return dirents.filter((dirent) => !dirent.isSymbolicLink()).length > 1;
  };
  this.getDataItemLatest = async (id) => {
    const buf = await fs.readFile(`${db.options.local}${id}/${id}.svg`);
    return buf.toString();
  };
} as any as { new (): typeof TList })();
