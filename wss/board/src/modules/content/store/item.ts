import { BagStore } from 'src/modules/bag';
import { api } from 'src/plugins/api';
import type { ContentStore } from 'types/content';

export function initItem(this: ContentStore): void {
  this.item = {
    result: null,
    async fetch() {
      this.result = await api.item({
        id: BagStore.list.ids.values().next().value,
      });
    },
    clear() {
      this.result = null;
    },
  };
}
