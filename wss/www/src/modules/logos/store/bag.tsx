import type { LogosStore } from '../types';

export function initBag(this: LogosStore): void {
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
