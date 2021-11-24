import { addIndex } from './index/index';
import { initItem } from './item';
import { initOpts } from './opts';
import type { List } from './types';

export const list = new (function (this: List) {
  initOpts.call(this);
  initItem.call(this);
  this.plugin = async (inst) => {
    addIndex.call(this, inst);
  };
} as any as { new (): List })();
