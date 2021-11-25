import { api } from 'src/plugins/api';
import type { LogosStore } from '../types';

export function initSimple(
  this: LogosStore,
  name: 'categories' | 'companies',
): void {
  this[name] = {
    _items: undefined,
    get items() {
      return this._items;
    },
    set items(val) {
      this._items = val;
    },
    async fetch() {
      const res = await api[name]();

      this.add(res.data);
    },
    add(items) {
      this.items = items;
    },
  };
}
