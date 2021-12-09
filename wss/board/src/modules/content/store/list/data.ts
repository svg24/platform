import {
  action,
  computed,
  makeObservable,
  observable,
} from 'mobx';
import type { ContentStore } from 'types/content';

export function initListData(this: ContentStore): void {
  this.list.data = {
    _items: [],

    get items() {
      return this._items;
    },

    set items(val) {
      this._items = val;
    },

    get isItems() {
      return this.items.length > 0;
    },

    clear() {
      this.items = [];
    },

    add(data) {
      this.items = [...this.items ?? [], ...data];
    },
  };

  makeObservable(this.list.data, {
    _items: observable,
    add: action,
    clear: action,
    items: computed,
  });
}
