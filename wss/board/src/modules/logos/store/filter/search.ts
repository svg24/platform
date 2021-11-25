import {
  action,
  computed,
  makeObservable,
  observable,
} from 'mobx';
import { debounce, escapeStr } from 'src/utils';
import type { LogosStore } from '../../types';

export const initFilterSearch = function (this: LogosStore): void {
  this.filter.params.search.val = {
    _prev: undefined,
    _field: '',
    cur: undefined,
    get field() {
      return this._field;
    },
    set field(val) {
      this._field = val;
    },
  };

  this.filter.params.search.process = (val) => {
    this.filter.params.search.val.field = val;

    debounce(() => {
      const prev = this.filter.params.search.val._prev;
      const { isItems } = this.list;
      const trimmed = val.trim();

      if (prev === trimmed && val.match(/\s*$/)?.[0]?.length !== 1) return;
      if (prev && !isItems && trimmed.length > prev.length) return;
      if (!prev && isItems && !trimmed) return;

      if (!trimmed) {
        this.filter.params.search.reset();
      } else {
        this.filter.params.search.val.cur = escapeStr(val);
      }

      this.list.reset();

      this.filter.params.search.val._prev = trimmed;
    }, 300)();
  };

  Object.defineProperties(this, {
    isActive: {
      get: () => !!this.filter.params.search.val.field,
      enumerable: true,
    },
  });

  this.filter.params.search.reset = () => {
    this.filter.params.search.val.cur = undefined;
    this.filter.params.search.val.field = '';
  };

  makeObservable(this.filter.params.search, {
    process: action,
    reset: action,
  });
  makeObservable(this.filter.params.search.val, {
    _field: observable,
    field: computed,
  });
};
