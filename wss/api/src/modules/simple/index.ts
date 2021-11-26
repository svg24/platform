import { initOpts } from './opts';
import { initRoot } from './root';
import { addRoute } from './route';
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
    addRoute.call(this, inst);
  };
} as any as { new (): SimpleModule })();
