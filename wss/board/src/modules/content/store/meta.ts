import {
  action,
  computed,
  makeObservable,
  observable,
} from 'mobx';
import type { ContentStore } from 'types/content';

export function initMeta(this: ContentStore): void {
  this.meta = {
    length: {
      _cur: 0,
      get cur() {
        return this._cur;
      },
      set cur(val) {
        this._cur = val;
      },
      setCur(val) {
        this.cur = val;
      },
      _total: 0,
      get total() {
        return this._total;
      },
      set total(val) {
        this._total = val;
      },
      setTotal(val) {
        this.total = val;
      },
    },
    page: {
      next: 0,
      setNext(val) {
        this.next = val;
      },
      reset() {
        this.next = 0;
      },
      _isNext: true,
      get isNext() {
        return this._isNext;
      },
      set isNext(val) {
        this._isNext = val;
      },
      setIsNext(val) {
        this.isNext = val;
      },
    },
    update(meta) {
      this.length.setCur(meta.length.current);
      this.length.setTotal(meta.length.total);
      this.page.setIsNext(meta.page.isNext);
      this.page.setNext(meta.page.next);
    },
  };

  makeObservable(this.meta.length, {
    _cur: observable,
    _total: observable,
    cur: computed,
    setCur: action,
    setTotal: action,
    total: computed,
  });
  makeObservable(this.meta.page, {
    _isNext: observable,
    isNext: computed,
    setIsNext: action,
  });
}
