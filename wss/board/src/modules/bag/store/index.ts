import { initStore } from 'src/utils';
import type { BagStore as Store } from 'types/bag';
import { initRoot } from './root';

export const BagStore = new (function (this: Store) {
  initStore.call(this);
  initRoot.call(this);
} as any as { new (): Store })();
