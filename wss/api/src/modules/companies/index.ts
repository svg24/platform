import { addIndex } from './index/index';
import { initOpts } from './opts';
import { initRoot } from './root';
import type { Companies } from './types';

export const companies = new (function (this: Companies) {
  initRoot.call(this);
  initOpts.call(this);
  this.plugin = async (inst) => {
    addIndex.call(this, inst);
  };
} as any as { new (): Companies })();
