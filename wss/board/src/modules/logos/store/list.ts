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

    _isMore: true,

    get isMore() {
      return this._isMore;
    },

    set isMore(val) {
      this._isMore = val;
    },

    updateIsMore(val) {
      this.isMore = val;
    },

    upload: async () => {
      const res = await this.list.fetch();

      this.list.updateIsMore(res.meta.page.isNext);
      this.filter.params.page.next();
      this.list.add(res.data);
    },

    reset: async () => {
      this.filter.params.page.reset();

      const res = await this.list.fetch(this.filter.params.multiplier);

      this.list.updateIsMore(res.meta.page.isNext);
      this.filter.params.page.next();
      this.list.clear();
      this.list.add(res.data);
    },

    fetch: async (multiplier) => {
      const name = this.filter.params.search.val.cur;
      const page = this.filter.params.page.val.cur;
      const sortBy = this.filter.params.sortBy.val.cur;
      const res = api.list({
        ...multiplier ? { multiplier } : {},
        ...name ? { name } : {},
        ...page ? { page } : {},
        ...sortBy ? { sortBy } : {},
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
    _isMore: observable,
    _items: observable,
    add: action,
    clear: action,
    isMore: computed,
    items: computed,
    updateIsMore: action,
  });
}
