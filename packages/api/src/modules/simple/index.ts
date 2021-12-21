import mongoose from 'mongoose';
import type Simple from 'types/simple';
import { addRoute } from './route';

const createSimple = (collection: string): typeof Simple => (
  new (function (this: typeof Simple) {
    Object.defineProperty(this, 'schema', {
      enumerable: true,
      value: new mongoose.Schema({
        id: { type: String, required: true },
        name: { type: String, required: true },
      }, {
        collection,
      }),
    });
    Object.defineProperty(this, 'model', {
      enumerable: true,
      value: mongoose.model(collection.toUpperCase(), this.schema),
    });
    Object.defineProperty(this, 'options', {
      enumerable: true,
      value: {
        prefix: collection,
      },
    });

    this.plugin = async (inst) => {
      addRoute.call(this, inst);
    };
  } as any as { new (): typeof Simple })()
);

export const categories = createSimple('categories');
export const companies = createSimple('companies');
