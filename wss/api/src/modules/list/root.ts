import mongoose from 'mongoose';
import type { List } from 'types/list';

export function initRoot(this: List): void {
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
  this.model = mongoose.model('List', this.schema);
  this.opts = {
    prefix: 'list',
  };
}
