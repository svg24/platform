import {
  action,
  computed,
  makeObservable,
  observable,
} from 'mobx';
import { debounce, escapeStr } from 'src/utils';
import type { LogosStore } from 'types/logos';

export const initSearch = function (this: LogosStore): void {
  this.search = {
    val: {
      _prev: undefined,
      _field: '',
      cur: undefined,
      get field() {
        return this._field;
      },
      set field(val) {
        this._field = val;
      },
    },
    process: (val) => {
      this.search.val.field = val;

      debounce(() => {
        const prev = this.search.val._prev;
        const { isItems } = this.list;
        const trimmed = val.trim();

        if (prev === trimmed && val.match(/\s*$/)?.[0]?.length !== 1) return;
        if (prev && !isItems && trimmed.length > prev.length) return;
        if (!prev && isItems && !trimmed) return;

        if (!trimmed) {
          this.search.reset();
        } else {
          this.search.val.cur = escapeStr(val);
        }

        this.list.reset();

        this.search.val._prev = trimmed;
      }, 300)();
    },
    reset() {
      this.val.cur = undefined;
      this.val.field = '';
    },
  };

  makeObservable(this.search, {
    process: action,
    reset: action,
  });
  makeObservable(this.search.val, {
    _field: observable,
    field: computed,
  });
};
