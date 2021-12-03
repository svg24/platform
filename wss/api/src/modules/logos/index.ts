import type { Logos } from 'types/logos';
import { addIndex } from './index/index';
import { initOpts } from './opts';
import { initRoot } from './root';

export const logos = new (function (this: Logos) {
  initRoot.call(this);
  initOpts.call(this);
  this.plugin = async (inst) => {
    addIndex.call(this, inst);
  };
} as any as { new (): Logos })();
