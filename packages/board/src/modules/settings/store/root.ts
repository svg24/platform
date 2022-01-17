import type { Store } from 'types/settings';

export function initRoot(this: Store): void {
  this.mount = function mount() {
    return new Promise((resolve) => {
      this.size.fetch();
      this.filter.fetch();
      resolve();
    });
  };
}
