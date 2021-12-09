import { initStore } from 'src/utils';
import type { ContentStore as Store } from 'types/content';
import { initItem } from './item';
import { initList } from './list';
import { initSentinel } from './sentinel';

export const ContentStore = new (function (this: Store) {
  initStore.call(this);
  initList.call(this);
  initSentinel.call(this);
  initItem.call(this);
} as any as { new (): Store })();
