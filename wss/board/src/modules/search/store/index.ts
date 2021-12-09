import { initStore } from 'src/utils';
import type { SearchStore as Store } from 'types/search';
import { initRoot } from './root';

export const SearchStore = new (function (this: Store) {
  initStore.call(this);
  initRoot.call(this);
} as any as { new (): Store })();
