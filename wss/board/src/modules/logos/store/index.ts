import { initStore } from 'src/utils';
import type { LogosStore as Store } from 'types/logos';
import { initBag } from './bag';
import { initList } from './list';
import { initMeta } from './meta';
import { initSearch } from './search';
import { initSentinel } from './sentinel';

export const LogosStore = new (function (this: Store) {
  initStore.call(this);
  initSearch.call(this);
  initMeta.call(this);
  initList.call(this);
  initSentinel.call(this);
  initBag.call(this);
} as any as { new (): Store })();
