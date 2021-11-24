import mongoose from 'mongoose';
import { db } from '../../core';
import type { Logos, LogosItem } from './types';

const strReq = { type: String, required: true };

export function initRoot(this: Logos): void {
  this.schema = new mongoose.Schema<LogosItem>({
    id: strReq,
    name: strReq,
    company: strReq,
    category: strReq,
    date: strReq,
    src: strReq,
  }, {
    collection: db.opts.col,
  });
  this.model = mongoose.model<LogosItem>('LogosItem', this.schema);
}
