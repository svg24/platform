import {
  action,
  computed,
  makeObservable,
  observable,
} from 'mobx';
import { api } from 'src/plugins/api';
import type { FilterStore } from 'types/filter';

const methods: {
  [key in 'category' | 'company' | 'sortBy']:
  'categories' | 'companies' | 'sortBy'
} = {
  category: 'categories',
  company: 'companies',
  sortBy: 'sortBy',
};

const legends = {
  category: 'Categories',
  company: 'Companies',
  sortBy: 'Sort by',
};

export function initParameter(
  this: FilterStore,
  id: keyof typeof methods,
): void {
  this[id] = {
    id,
    legend: legends[id],
    opts: undefined,
    val: {
      _def: undefined,
      _cur: undefined,
      get cur() {
        return this._cur;
      },
      set cur(val) {
        this._cur = val;
      },
      checkIsCur(passedId) {
        return passedId === this.cur?.id;
      },
    },
    get isApplied() {
      return this.val._def
        ? this.val.cur?.id !== this.val._def.id
        : !!this.val.cur;
    },
    fetch: async () => {
      const res = await api[methods[id]]();

      this[id].opts = res.data;

      if (res.meta) {
        this[id].val._def = res.meta.default;
        this[id].val.cur = res.meta.default;
      }
    },
    set: (item) => {
      this[id].val.cur = item;
    },
    reset: () => {
      this[id].val.cur = this[id].val._def;
    },
  };

  makeObservable(this[id], {
    set: action,
    reset: action,
  });
  makeObservable(this[id].val, {
    _cur: observable,
    cur: computed,
  });
}
