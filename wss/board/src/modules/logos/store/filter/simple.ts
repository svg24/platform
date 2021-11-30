import {
  action,
  computed,
  makeObservable,
  observable,
} from 'mobx';
import { api } from 'src/plugins/api';
import type { LogosStore } from '../../types';

export function initSimple(
  this: LogosStore,
  id: 'categories' | 'companies',
): void {
  this.filter.params[id] = {
    id,
    legend: `${id[0]?.toUpperCase()}${id.slice(1)}`,
    opts: undefined,
    async fetch() {
      this.opts = (await api[id]()).data;
    },
    set: (passedId) => {
      this.filter.params[id].val.cur = passedId;
    },
    reset: () => {
      this.filter.params[id].val.cur = undefined;
    },
    val: {
      _cur: undefined,
      get cur() {
        return this._cur;
      },
      set cur(val) {
        this._cur = val;
      },
    },
    get isActive() {
      return !!this.val.cur;
    },
  };

  makeObservable(this.filter.params[id], {
    set: action,
    reset: action,
  });
  makeObservable(this.filter.params[id].val, {
    _cur: observable,
    cur: computed,
  });
}
