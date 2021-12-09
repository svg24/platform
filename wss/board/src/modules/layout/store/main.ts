import { initStoreVisible } from 'src/utils';
import type { LayoutStore } from 'types/layout';

export function initMain(this: LayoutStore): void {
  Object.defineProperty(this, 'main', {
    value: {
      content: {
        goTop: null,
      },
      filter: {
        toggle: () => {
          if (this.main.filter.isVisible) {
            this.main.filter.hide();
          } else {
            this.main.filter.show();
          }
        },
      },
    },
    enumerable: true,
  });

  initStoreVisible.call(this.main.filter);
}
