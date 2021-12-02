import type { ContentStore } from 'types/content';

export function initBag(this: ContentStore): void {
  this.bag = {
    items: undefined,

    add(item) {
      this.items = [item];
    },

    clear() {
      this.items = undefined;
    },
  };
}
