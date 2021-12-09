import {
  action,
  computed,
  makeObservable,
  observable,
} from 'mobx';
import type { OptionsStoreSize } from 'types/settings';

export type FilterSelectOptions = {
  def: string;
  legend: string;
  opts: {
    name: string;
    val: string;
  }[];
};

export const initFilterSelect = function (
  this: OptionsStoreSize,
  opts: FilterSelectOptions,
): void {
  this.legend = opts.legend;
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
