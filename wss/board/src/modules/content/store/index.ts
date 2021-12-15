import type { ContentStore as Store } from 'types/content';
import { initItem } from './item';
import { initList } from './list';
import { initSentinel } from './sentinel';

export const ContentStore = new (function (this: Store) {
  initList.call(this);
  initItem.call(this);
  initSentinel.call(this);
} as any as { new (): Store })();
