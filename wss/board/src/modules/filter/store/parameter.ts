import {
  action,
  computed,
  makeObservable,
  observable,
} from 'mobx';
import { api } from 'src/plugins/api';
import type { ApiSimplMethods } from 'types/api';
import type { FilterStore } from 'types/filter';

const methods: {
  [key in ApiSimplMethods]: 'categories' | 'companies' | 'sortBy'
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

export function initParameter(this: FilterStore, id: ApiSimplMethods): void {
  this[id] = {
    id,
    legend: legends[id],
    options: null,
    value: {
      _default: null,
      _current: null,
      get current() {
        return this._current;
      },
      set current(value) {
        this._current = value;
      },
      checkCurrent(passedId) {
        return passedId === this.current?.id;
      },
    },
    get isApplied() {
      return this.value._default
        ? this.value.current?.id !== this.value._default.id
        : !!this.value.current;
    },
    fetch: async () => {
      const res = await api[methods[id]]();

      this[id].options = res.data;
      this[id].value._default = res.meta.default;
      this[id].value.current = res.meta.default;
    },
    set: (item) => {
      this[id].value.current = item;
    },
    reset: () => {
      this[id].value.current = this[id].value._default;
    },
  };

  makeObservable(this[id], {
    set: action,
    reset: action,
  });
  makeObservable(this[id].value, {
    _current: observable,
    current: computed,
  });
}
