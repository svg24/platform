import { initStore } from 'src/utils';
import type { LogosStore as Store } from '../types';
import { initBag } from './bag';
import { initFilter } from './filter';
import { initList } from './list';
import { initMeta } from './meta';
import { initSentinel } from './sentinel';

export const LogosStore = new (function (this: Store) {
  initStore.call(this);
  initMeta.call(this);
  initFilter.call(this);
  initList.call(this);
  initSentinel.call(this);
  initBag.call(this);
} as any as { new (): Store })();
