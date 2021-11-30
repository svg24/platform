import {
  action,
  computed,
  makeObservable,
  observable,
} from 'mobx';
import { api } from 'src/plugins/api';
import type { LogosStore } from 'types/modules/logos';

export function initSimple(
  this: LogosStore,
  id: 'categories' | 'companies',
): void {
  const def = undefined;

  this.filter[id] = {
    id,
    legend: `${id[0]?.toUpperCase()}${id.slice(1)}`,
    opts: undefined,
    async fetch() {
      this.opts = (await api[id]()).data;
    },
    set: (passedId) => {
      this.filter[id].val.cur = passedId;
    },
    reset: () => {
      this.filter[id].val.cur = this.filter[id].val._def;
    },
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
      return this.val.cur !== this.val._def;
    },
  };

  makeObservable(this.filter[id], {
    set: action,
    reset: action,
  });
  makeObservable(this.filter[id].val, {
    _cur: observable,
    cur: computed,
  });
}
