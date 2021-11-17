import {
  action,
  computed,
  makeObservable,
  observable,
} from 'mobx';
import type { LogosStore } from '../types';

type LogosInfoResult = {
  total: number;
};

export function initInfo(this: LogosStore): void {
  this.info = {
    _total: 0,
    get total() {
      return this._total;
    },
    set total(val) {
      this._total = val;
    },
    fetch: async () => {
      const url = '/api/logos/';
      const raw = await fetch(url);
      const res: LogosInfoResult = await raw.json();

      this.info.total = res.total;
    },
  };

  makeObservable(this.info, {
    _total: observable,
    total: computed,
    fetch: action,
  });
}
