import mongoose from 'mongoose';
import type { Companies } from './types';

export function initRoot(this: Companies): void {
  this.schema = new mongoose.Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
  }, {
    collection: 'companies',
  });
  this.model = mongoose.model('CompaniesItem', this.schema);
}
