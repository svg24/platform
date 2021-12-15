import { api } from 'src/plugins/api';
import { Store as RootStore } from 'src/store';
import type { Store } from 'types/content';

export function initItem(this: Store): void {
  this.item = {
    result: null,
    async fetch() {
      this.result = await api.item({
        id: RootStore.bag.list.values().next().value,
      });
    },
    clear() {
      this.result = null;
    },
  };
}
