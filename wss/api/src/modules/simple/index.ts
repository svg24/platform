import { addIndex } from './index/index';
import { initOpts } from './opts';
import { initRoot } from './root';
import type { SimpleModule } from './types';

export const createSimple = ({
  collection,
  name,
}: {
  collection: string;
  name: string;
}): SimpleModule => new (function (this: SimpleModule) {
  initRoot.call(this, collection, name);
  initOpts.call(this, collection);
  this.plugin = async (inst) => {
    addIndex.call(this, inst);
  };
} as any as { new (): SimpleModule })();
