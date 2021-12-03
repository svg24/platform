import mongoose from 'mongoose';
import type { Logos } from 'types/logos';

export function initRoot(this: Logos): void {
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
  this.model = mongoose.model('LogosItem', this.schema);
}
