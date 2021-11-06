import { computed, makeObservable, observable } from 'mobx';
import type { LogosFilterSelect, LogosFilterSelectOptions } from 'src/types';

export const FilterSelect = function (
  this: LogosFilterSelect,
  opts: LogosFilterSelectOptions,
): void {
  this.id = opts.id;
  this.name = opts.name;
  this.opts = opts.opts;
  this.val = {
    _cur: opts.def,
    _def: opts.def,
    get cur() {
      return this._cur;
    },
    set cur(val) {
      this._cur = val;
    },
  };

  Object.defineProperties(this, {
    isActive: {
      get: () => this.val.cur !== this.val._def,
      enumerable: true,
    },
  });

  this.onChange = (val) => {
    this.val.cur = val;
  };
  this.reset = () => {
    this.val.cur = this.val._def;
  };

  makeObservable(this.val, {
    _cur: observable,
    cur: computed,
  });
} as any as {
  new (opts: LogosFilterSelectOptions): LogosFilterSelect;
};
