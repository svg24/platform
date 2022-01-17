import { SettingsStore } from 'src/modules/settings';
import { initStoreVisible } from 'src/utils';
import type { Store } from 'types/layout';

export function initMain(this: Store): void {
  Object.defineProperty(this, 'main', {
    enumerable: true,
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
  });

  initStoreVisible.call(this.main.filter);

  this.main.filter.mount = function mount() {
    const { id } = SettingsStore.filter.value.current;

    if (id === 'hidden' || id === 'auto') {
      this.isVisible = false;
      return;
    }

    if (id === 'visible') {
      this.isVisible = true;
    }
  };
}
