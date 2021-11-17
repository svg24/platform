import { initStore } from 'src/utils';
import type { LayoutStore as Store } from '../types';
import { initNav } from './nav';
import { initRoot } from './root';
import { initSidebar } from './sidebar';

export const LayoutStore = new (function (this: Store) {
  initStore.call(this);
  initRoot.call(this);
  initNav.call(this);
  initSidebar.call(this);
} as any as { new (): Store })();
