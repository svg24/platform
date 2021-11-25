import {
  action,
  computed,
  makeObservable,
  observable,
} from 'mobx';
import type { LogosFilterSelect } from '../../types';

export type FilterSelectOptions = {
  def: string;
  name: string;
  opts: {
    name: string;
    val: string;
  }[];
};

export const initFilterSelect = function (
  this: LogosFilterSelect,
  opts: FilterSelectOptions,
): void {
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

  makeObservable(this, {
    onChange: action,
    reset: action,
  });
  makeObservable(this.val, {
    _cur: observable,
    cur: computed,
  });
};
