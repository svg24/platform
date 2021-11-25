import {
  action,
  computed,
  makeObservable,
  observable,
} from 'mobx';
import { api } from 'src/plugins/api';
import type { LogosStore } from '../types';

export function initList(this: LogosStore): void {
  this.list = {
    _items: undefined,

    get items() {
      return this._items;
    },

    set items(val) {
      this._items = val;
    },

    get isItems() {
      return (this.items?.length ?? 0) > 0;
    },

    upload: async () => {
      const res = await this.list.fetch();

      this.meta.update(res.meta);
      this.list.add(res.data);
    },

    reset: async () => {
      this.meta.page.reset();

      const res = await this.list.fetch(this.filter.params.multiplier);

      this.meta.update(res.meta);
      this.list.clear();
      this.list.add(res.data);
    },

    fetch: async (multiplier) => {
      const name = this.filter.params.search.val.cur;
      const sortBy = this.filter.params.sortBy.val.cur;
      const res = await api.list({
        ...multiplier ? { multiplier } : {},
        ...name ? { name } : {},
        ...sortBy ? { sortBy } : {},
        page: this.meta.page.next,
      });

      return res;
    },

    clear() {
      this.items = [];
    },

    add(data) {
      this.items = [...this.items ?? [], ...data];
    },
  };

  makeObservable(this.list, {
    _items: observable,
    add: action,
    clear: action,
    items: computed,
  });
}
