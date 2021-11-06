import { computed, makeObservable, observable } from 'mobx';
import type { LogosListResult, LogosStore } from 'src/types';

export function initList(this: LogosStore, store: LogosStore): void {
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

    async upload() {
      const res = await this.fetch();
      this.isMore = res.isMore;

      store.filter.params.page.next();
      this.add(res.data);
    },

    async reset() {
      store.filter.params.page.reset();

      const res = await this.fetch();
      this.isMore = res.isMore;

      store.filter.params.page.next();
      this.clear();
      this.add(res.data);
    },

    async fetch() {
      const raw = await fetch(
        [
          store.filter.params.page,
          store.filter.params.search,
          store.filter.params.sortBy,
        ].reduce((acc, cur) => (
          cur.val.cur ? `${acc}&${cur.id}=${cur.val.cur}` : acc
        ), '/api/logos/list?'),
      );
      const res: LogosListResult = await raw.json();

      return res;
    },

    clear() {
      this.items = [];
    },

    add(data) {
      this.items = [...this?.items ?? [], ...data];
    },
  };

  makeObservable(this.list, {
    _items: observable,
    items: computed,
  });
}
