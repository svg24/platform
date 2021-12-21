import type { Store } from 'types/bag';

export function initList(this: Store): void {
  this.list = new Set();
}
