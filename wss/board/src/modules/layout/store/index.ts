import { initStore } from 'src/utils';
import type { LayoutStore as Store } from 'types/layout';
import { initBag } from './bag';
import { initMain } from './main';

export const LayoutStore = new (function (this: Store) {
  initStore.call(this);
  initMain.call(this);
  initBag.call(this);
} as any as { new (): Store })();
