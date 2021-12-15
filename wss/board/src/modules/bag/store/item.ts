import {
  action,
  computed,
  makeObservable,
  observable,
} from 'mobx';
import type { BagStore } from 'types/bag';

export function initItem(this: BagStore): void {
  this.item = {
    _data: null,
    get data() {
      return this._data;
    },
    set data(val) {
      this._data = val;
    },
    setData(val) {
      this.data = val;
    },
    meta: null,
    setMeta(val) {
      this.meta = val;
    },
    settings: {
      action: null,
      setAction(fn) {
        this.action = fn;
      },
      type: null,
      setType(type) {
        this.type = type;
      },
    },
  };

  makeObservable(this.item, {
    _data: observable,
    data: computed,
    setData: action,
    setMeta: action,
  });
}
