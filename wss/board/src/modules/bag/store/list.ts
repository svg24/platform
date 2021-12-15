import type { BagStore } from 'types/bag';

export function initList(this: BagStore): void {
  this.list = {
    ids: new Set(),
    add(id) {
      this.ids.add(id);
    },
    delete(id) {
      this.ids.delete(id);
    },
    clear() {
      this.ids.clear();
    },
  };
}
