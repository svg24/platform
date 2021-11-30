import {
  action,
  computed,
  makeObservable,
  observable,
} from 'mobx';
import type { LogosStore } from 'types/modules/logos';

export const initSortBy = function (this: LogosStore): void {
  Object.defineProperties(this.filter.params, {
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
  Object.defineProperties(this.filter.params.sortBy.val, {
    def: {
      value: this.filter.params.sortBy.opts[0]?.id,
      enumerable: true,
    },
  });
  Object.defineProperties(this.filter.params.sortBy.val, {
    _cur: {
      value: this.filter.params.sortBy.val.def,
      enumerable: true,
      configurable: true,
    },
    cur: {
      get: () => {
        const { val } = this.filter.params.sortBy;

        return val._cur || val.def;
      },
      set: (val) => {
        this.filter.params.sortBy.val._cur = val;
      },
      enumerable: true,
      configurable: true,
    },
  });
  Object.defineProperties(this.filter.params.sortBy, {
    isActive: {
      get: () => {
        const { val } = this.filter.params.sortBy;

        return val._cur !== val.def;
      },
      enumerable: true,
    },
  });

  this.filter.params.sortBy.set = (id) => {
    this.filter.params.sortBy.val.cur = id;
  };
  this.filter.params.sortBy.reset = () => {
    this.filter.params.sortBy.val.cur = this.filter.params.sortBy.val.def;
  };

  makeObservable(this.filter.params.sortBy, {
    set: action,
    reset: action,
  });
  makeObservable(this.filter.params.sortBy.val, {
    _cur: observable,
    cur: computed,
  });
};
