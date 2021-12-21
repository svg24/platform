import type { Store } from 'types/layout';
import { initBag } from './bag';
import { initMain } from './main';

export const LayoutStore = new (function (this: Store) {
  initMain.call(this);
  initBag.call(this);
} as any as { new (): Store })();
