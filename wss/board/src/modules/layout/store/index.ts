import { initStore } from 'src/utils';
import type { LayoutStore as Store } from 'types/layout';
import { initMain } from './main';
import { initSidebar } from './sidebar';

export const LayoutStore = new (function (this: Store) {
  initStore.call(this);
  initMain.call(this);
  initSidebar.call(this);
} as any as { new (): Store })();
