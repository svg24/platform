import type { Store } from 'types/search';
import { initRoot } from './root';

export const SearchStore = new (function (this: Store) {
  initRoot.call(this);
} as any as { new (): Store })();
