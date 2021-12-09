import { initStoreVisible } from 'src/utils';
import type { ContentStore } from 'types/content';

export function initSentinel(this: ContentStore): void {
  Object.defineProperty(this, 'sentinel', {
    value: {},
    enumerable: true,
  });
  initStoreVisible.call(this.sentinel);
}
