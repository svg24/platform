import type { List } from 'types/list';
import { initRoot } from './root';
import { addRoute } from './route';

export const list = new (function (this: List) {
  initRoot.call(this);
  this.plugin = async (inst) => {
    addRoute.call(this, inst);
  };
} as any as { new (): List })();
