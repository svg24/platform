import { initStoreVisible } from 'src/utils';
import type { LayoutStore } from 'types/layout';

export function initBag(this: LayoutStore): void {
  Object.defineProperty(this, 'bag', {
    enumerable: true,
    value: {
      goBack: null,
    },
  });

  initStoreVisible.call(this.bag);
}
