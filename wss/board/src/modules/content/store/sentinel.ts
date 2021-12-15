import { initStoreVisible } from 'src/utils';
import type { Store } from 'types/content';

export function initSentinel(this: Store): void {
  Object.defineProperty(this, 'sentinel', {
    enumerable: true,
    value: {},
  });

  initStoreVisible.call(this.sentinel);
}
