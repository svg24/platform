import {
  action,
  computed,
  makeObservable,
  observable,
} from 'mobx';
import type { Store } from 'types/content';

export function initListResponse(this: Store): void {
  this.list.response = {
    data: {
      _items: [],
      get items() {
        return this._items;
      },
      set items(value) {
        this._items = value;
      },
      get isItems() {
        return this.items.length > 0;
      },
      clear() {
        this.items = [];
      },
      add(data) {
        this.items = [...this.items ?? [], ...data];
      },
    },
    meta: {
      length: {
        _current: 0,
        get current() {
          return this._current;
        },
        set current(value) {
          this._current = value;
        },
        setCurrent(value) {
          this.current = value;
        },
        _total: 0,
        get total() {
          return this._total;
        },
        set total(value) {
          this._total = value;
        },
        setTotal(value) {
          this.total = value;
        },
      },
      page: {
        next: 0,
        setNext(value) {
          this.next = value;
        },
        reset() {
          this.next = 0;
        },
        _hasNext: true,
        get hasNext() {
          return this._hasNext;
        },
        set hasNext(value) {
          this._hasNext = value;
        },
        setHasNext(value) {
          this.hasNext = value;
        },
      },
      set(meta) {
        this.length.setCurrent(meta.length.current);
        this.length.setTotal(meta.length.total);
        this.page.setHasNext(meta.page.hasNext);
        this.page.setNext(meta.page.next);
      },
    },
  };

  makeObservable(this.list.response.data, {
    _items: observable,
    add: action,
    clear: action,
    items: computed,
  });
  makeObservable(this.list.response.meta.length, {
    _current: observable,
    _total: observable,
    current: computed,
    setCurrent: action,
    setTotal: action,
    total: computed,
  });
  makeObservable(this.list.response.meta.page, {
    _hasNext: observable,
    hasNext: computed,
    setHasNext: action,
  });
}
