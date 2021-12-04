import type { Item } from 'types/item';
import { initRoot } from './root';
import { addRoute } from './route';

export const item = new (function (this: Item) {
  initRoot.call(this);
  this.plugin = async (inst) => {
    addRoute.call(this, inst);
  };
} as any as { new (): Item })();
