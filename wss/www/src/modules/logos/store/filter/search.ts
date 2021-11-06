import { computed, makeObservable, observable } from 'mobx';
import type {
  LogosFilterSearch,
  LogosFilterSearchOptions,
  LogosStore,
} from 'src/types';
import { debounce, escapeStr } from 'src/utils';

export const FilterSearch = function (
  this: LogosFilterSearch,
  store: LogosStore,
  opts: LogosFilterSearchOptions,
): void {
  this.id = opts.id;
  this.val = {
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

  this.process = (val) => {
    this.val.field = val;

    debounce(() => {
      const prev = this.val._prev;
      const { isItems } = store.list;
      const trimmed = val.trim();

      if (prev === trimmed && val.match(/\s*$/)?.[0]?.length !== 1) return;
      if (prev && !isItems && trimmed.length > prev.length) return;
      if (!prev && isItems && !trimmed) return;

      if (!trimmed) {
        this.reset();
      } else {
        this.val.cur = escapeStr(val);
      }

      store.list.reset();

      this.val._prev = trimmed;
    }, 100)();
  };

  Object.defineProperties(this, {
    isActive: {
      get: () => !!this.val.field,
      enumerable: true,
    },
  });

  this.reset = () => {
    this.val.cur = undefined;
    this.val.field = '';
  };

  makeObservable(this.val, {
    _field: observable,
    field: computed,
  });
} as any as {
  new (
    store: LogosStore,
    opts: LogosFilterSearchOptions,
  ): LogosFilterSearch;
};
