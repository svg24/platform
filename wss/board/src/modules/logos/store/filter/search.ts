import {
  action,
  computed,
  makeObservable,
  observable,
} from 'mobx';
import { debounce, escapeStr } from 'src/utils';
import type { LogosStore } from 'types/modules/logos';

export const initSearch = function (this: LogosStore): void {
  this.filter.search.id = 'search';
  this.filter.search.val = {
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

  this.filter.search.process = (val) => {
    this.filter.search.val.field = val;

    debounce(() => {
      const prev = this.filter.search.val._prev;
      const { isItems } = this.list;
      const trimmed = val.trim();

      if (prev === trimmed && val.match(/\s*$/)?.[0]?.length !== 1) return;
      if (prev && !isItems && trimmed.length > prev.length) return;
      if (!prev && isItems && !trimmed) return;

      if (!trimmed) {
        this.filter.search.reset();
      } else {
        this.filter.search.val.cur = escapeStr(val);
      }

      this.list.reset();

      this.filter.search.val._prev = trimmed;
    }, 300)();
  };

  Object.defineProperties(this.filter.search, {
    isActive: {
      get: () => !!this.filter.search.val.field,
      enumerable: true,
    },
  });

  this.filter.search.reset = () => {
    this.filter.search.val.cur = undefined;
    this.filter.search.val.field = '';
  };

  makeObservable(this.filter.search, {
    process: action,
    reset: action,
  });
  makeObservable(this.filter.search.val, {
    _field: observable,
    field: computed,
  });
};
