import { initStore } from 'src/utils';
import type { ContentStore as Store } from 'types/content';
import { initBag } from './bag';
import { initList } from './list';
import { initMeta } from './meta';
import { initSearch } from './search';
import { initSentinel } from './sentinel';

export const ContentStore = new (function (this: Store) {
  initStore.call(this);
  initSearch.call(this);
  initMeta.call(this);
  initList.call(this);
  initSentinel.call(this);
  initBag.call(this);
} as any as { new (): Store })();
