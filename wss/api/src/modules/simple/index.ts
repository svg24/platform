import type { SimpleModule } from 'types/simple';
import { initRoot } from './root';
import { addRoute } from './route';

export const createSimple = (collection: string): SimpleModule => (
  new (function (this: SimpleModule) {
    initRoot.call(this, collection);
    this.plugin = async (inst) => {
      addRoute.call(this, inst);
    };
  } as any as { new (): SimpleModule })()
);
