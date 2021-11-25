import { addIndex } from './index/index';
import { initOpts } from './opts';
import { initRoot } from './root';
import type { Categories } from './types';

export const categories = new (function (this: Categories) {
  initRoot.call(this);
  initOpts.call(this);
  this.plugin = async (inst) => {
    addIndex.call(this, inst);
  };
} as any as { new (): Categories })();
