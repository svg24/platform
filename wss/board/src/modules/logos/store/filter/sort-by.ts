import {
  action,
  computed,
  makeObservable,
  observable,
} from 'mobx';
import type { LogosStore } from 'types/modules/logos';

export const initSortBy = function (this: LogosStore): void {
  const date = {
    id: 'date',
    name: 'Date',
  };
  const opts = [date, {
    id: 'name',
    name: 'Name',
  }];
  const def = date.id;

  this.filter.sortBy = {
    opts,
    id: 'sortBy',
    legend: 'Sort by',
    val: {
      _def: def,
      _cur: def,
      get cur() {
        return this._cur;
      },
      set cur(val) {
        this._cur = val;
      },
    },
    get isActive() {
      return this.val._cur !== this.val._def;
    },
    set(id) {
      this.val.cur = id;
    },
    reset() {
      this.val.cur = this.val._def;
    },
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
