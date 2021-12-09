import {
  action,
  computed,
  makeObservable,
  observable,
} from 'mobx';
import { ContentStore } from 'src/modules/content';
import { debounce, escapeStr } from 'src/utils';
import type { SearchStore } from 'types/search';

export const initRoot = function (this: SearchStore): void {
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
      const { isItems } = ContentStore.list.data;
      const trimmed = val.trim();

      if (prev === trimmed && val.match(/\s*$/)?.[0]?.length !== 1) return;
      if (prev && !isItems && trimmed.length > prev.length) return;
      if (!prev && isItems && !trimmed) return;

      if (!trimmed) {
        this.reset();
      } else {
        this.val.cur = escapeStr(val);
      }

      ContentStore.list.reset();

      this.val._prev = trimmed;
    }, 300)();
  };

  this.reset = () => {
    this.val.cur = undefined;
    this.val.field = '';
  };

  makeObservable(this as object, {
    process: action,
    reset: action,
  });
  makeObservable(this.val, {
    _field: observable,
    field: computed,
  });
};
