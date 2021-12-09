import type { ContentStore } from 'types/content';

export function initBag(this: ContentStore): void {
  this.bag = {
    ids: [],
    add(id) {
      this.ids = [id];
    },
    clear() {
      this.ids = [];
    },
  };
}
