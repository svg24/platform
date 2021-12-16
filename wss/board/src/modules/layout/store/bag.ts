import { initStoreVisible } from 'src/utils';
import type { Store } from 'types/layout';

export function initBag(this: Store): void {
  Object.defineProperty(this, 'bag', {
    enumerable: true,
    value: {
      goBack: null,
    },
  });

  initStoreVisible.call(this.bag);
}
