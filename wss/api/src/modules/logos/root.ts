import mongoose from 'mongoose';
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
    collection: 'logos',
  });
  this.model = mongoose.model<LogosItem>('LogosItem', this.schema);
}
