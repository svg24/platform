import { api } from 'src/plugins/api';
import { Store } from 'src/store';
import type { ContentStore } from 'types/content';

export function initItem(this: ContentStore): void {
  this.item = {
    result: null,
    async fetch() {
      this.result = await api.item({
        id: Store.bag.list.ids.values().next().value,
      });
    },
    clear() {
      this.result = null;
    },
  };
}
