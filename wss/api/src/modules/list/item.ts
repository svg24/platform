import mongoose from 'mongoose';
import { db } from '../../core';
import type { List, ListItem } from './types';

const strReq = { type: String, required: true };

export function initItem(this: List): void {
  this.item = {
    schema: new mongoose.Schema<ListItem>({
      id: strReq,
      name: strReq,
      company: strReq,
      category: strReq,
      date: strReq,
      src: strReq,
    }, {
      collection: db.opts.col,
    }),
    get model() {
      return mongoose.model<ListItem>('ListItem', this.schema);
    },
  };
}
