import type { Store } from 'types/filter';
import { initParameter } from './parameter';
import { initRoot } from './root';

export const FilterStore = new (function FilterStore(this: Store) {
  initRoot.call(this);
  initParameter.call(this, 'category');
  initParameter.call(this, 'company');
  initParameter.call(this, 'sortBy');
} as any as { new (): Store })();
