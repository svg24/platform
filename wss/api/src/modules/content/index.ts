import type { Content } from 'types/content';
import { initRoot } from './root';
import { addRoute } from './route';

export const content = new (function (this: Content) {
  initRoot.call(this);
  this.plugin = async (inst) => {
    addRoute.call(this, inst);
  };
} as any as { new (): Content })();
