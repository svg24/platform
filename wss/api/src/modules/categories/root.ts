import mongoose from 'mongoose';
import type { Categories } from './types';

export function initRoot(this: Categories): void {
  this.schema = new mongoose.Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
  }, {
    collection: 'categories',
  });
  this.model = mongoose.model('CategoriesItem', this.schema);
}
