import mongoose from 'mongoose';
import type { SimpleModule } from 'types/simple';

export function initRoot(
  this: SimpleModule,
  collection: string,
): void {
  this.schema = new mongoose.Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
  }, {
    collection,
  });
  this.model = mongoose.model(collection.toUpperCase(), this.schema);
  this.opts = {
    prefix: collection,
  };
}
