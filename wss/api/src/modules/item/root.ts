import type { Item } from 'types/item';

export function initRoot(this: Item): void {
  this.opts = {
    prefix: 'item',
  };
}
