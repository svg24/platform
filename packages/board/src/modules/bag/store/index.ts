import type { Store } from 'types/bag';
import { initItem } from './item';
import { initList } from './list';

export const BagStore = new (function BagStore(this: Store) {
  initItem.call(this);
  initList.call(this);
} as any as { new (): Store })();
