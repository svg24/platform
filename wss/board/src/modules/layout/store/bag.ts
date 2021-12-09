import { initStoreVisible } from 'src/utils';
import type { LayoutStore } from 'types/layout';

export function initBag(this: LayoutStore): void {
  Object.defineProperty(this, 'bag', {
    value: {
      goBack: null,
    },
    enumerable: true,
  });
  initStoreVisible.call(this.bag);
}
