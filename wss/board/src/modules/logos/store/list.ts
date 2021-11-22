import {
  action,
  computed,
  makeObservable,
  observable,
} from 'mobx';
import type { LogosListResult, LogosStore } from '../types';

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

      this.list.updateIsMore(res.isMore);
      this.filter.params.page.next();
      this.list.add(res.data);
    },

    reset: async () => {
      this.filter.params.page.reset();

      const res = await this.list.fetch(this.filter.params.initPage);

      this.list.updateIsMore(res.isMore);
      this.filter.params.page.next();
      this.list.clear();
      this.list.add(res.data);
    },

    fetch: async (multiplier) => {
      const url = [
        this.filter.params.page,
        this.filter.params.search,
        this.filter.params.sortBy,
      ].reduce((acc, cur) => (
        cur.val.cur ? `${acc}&${cur.id}=${cur.val.cur}` : acc
      ), '/api/logos/list?');
      const raw = await fetch(
        multiplier
          ? `${url}&multiplier=${multiplier}`
          : url,
      );
      const res: LogosListResult = await raw.json();

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
