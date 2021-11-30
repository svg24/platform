import {
  action,
  computed,
  makeObservable,
  observable,
} from 'mobx';
import type { LogosStore } from 'types/modules/logos';

export const initSortBy = function (this: LogosStore): void {
  Object.defineProperties(this.filter, {
    sortBy: {
      value: {
        id: 'sortBy',
        legend: 'Sort by',
        opts: [{
          id: 'date',
          name: 'Date',
        }, {
          id: 'name',
          name: 'Name',
        }],
        val: {},
      },
      enumerable: true,
    },
  });
  Object.defineProperties(this.filter.sortBy.val, {
    def: {
      value: this.filter.sortBy.opts[0]?.id,
      enumerable: true,
    },
  });
  Object.defineProperties(this.filter.sortBy.val, {
    _cur: {
      value: this.filter.sortBy.val.def,
      enumerable: true,
      configurable: true,
    },
    cur: {
      get: () => {
        const { val } = this.filter.sortBy;

        return val._cur || val.def;
      },
      set: (val) => {
        this.filter.sortBy.val._cur = val;
      },
      enumerable: true,
      configurable: true,
    },
  });
  Object.defineProperties(this.filter.sortBy, {
    isActive: {
      get: () => {
        const { val } = this.filter.sortBy;

        return val._cur !== val.def;
      },
      enumerable: true,
    },
  });

  this.filter.sortBy.set = (id) => {
    this.filter.sortBy.val.cur = id;
  };
  this.filter.sortBy.reset = () => {
    this.filter.sortBy.val.cur = this.filter.sortBy.val.def;
  };

  makeObservable(this.filter.sortBy, {
    set: action,
    reset: action,
  });
  makeObservable(this.filter.sortBy.val, {
    _cur: observable,
    cur: computed,
  });
};
