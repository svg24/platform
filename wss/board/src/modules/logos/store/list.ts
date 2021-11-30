import {
  action,
  computed,
  makeObservable,
  observable,
} from 'mobx';
import { FilterStore } from 'src/modules/filter';
import { LayoutStore } from 'src/modules/layout';
import { api } from 'src/plugins/api';
import type { LogosStore } from 'types/logos';

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

      const res = await this.list.fetch(FilterStore.multiplier);

      this.meta.update(res.meta);
      this.list.clear();
      LayoutStore.main.content.gotoTop();
      this.list.add(res.data);
    },

    fetch: async (multiplier) => {
      const name = this.search.val.cur;
      const res = await api.list({
        ...Object.fromEntries([
          FilterStore.category,
          FilterStore.company,
          FilterStore.sortBy,
        ].map((pr) => (pr.val.cur ? [pr.id, pr.val.cur.id] : []))),
        ...multiplier ? { multiplier } : {},
        ...name ? { name } : {},
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
