import { LogosList } from '@svg24/www/src/types/logos';
import { debounce, escapeStr } from '@svg24/www/src/utils';
import {
  action,
  computed,
  makeObservable,
  observable,
} from 'mobx';
import React, { ReactElement } from 'react';
import LogosItem from './components/logos-item/logos-item';

const getQueryInst = (): {
  name: string | null,
  page: number,
} => ({
  name: null,
  page: 1,
});

export class LogosStore {
  constructor() {
    makeObservable(this, {
      _items: observable,
      items: computed,
      processSearch: action,
    });
    makeObservable(this.query, {
      name: observable,
    });
  }

  /**
   * React
   */

  readonly ctx = React.createContext<LogosStore | null>(null);

  readonly provider = ({ children }: { children: ReactElement }) => (
    <this.ctx.Provider value={this}>
      {children}
    </this.ctx.Provider>
  );

  get inst() {
    return React.useContext(this.ctx);
  }

  /**
   * Items
   */

  _items: ReactElement[] = [];

  get items() {
    return this._items;
  }

  set items(val) {
    this._items = val;
  }

  get isItems() {
    return this.items.length > 0;
  }

  _isMoreItems = true;

  get isMoreItems() {
    return this._isMoreItems;
  }

  set isMoreItems(val) {
    this._isMoreItems = val;
  }

  async uploadItems() {
    const raw = await this.fetchItems();
    this.isMoreItems = raw.isMore;

    this.addItems(raw);
    this.upPage();
  }

  async uploadItemsFromScratch() {
    const raw = await this.fetchItems();
    this.isMoreItems = raw.isMore;

    this.clearItems();
    this.addItems(raw);
    this.upPage();
  }

  async fetchItems() {
    const res = await fetch(
      Object.entries(this.query).reduce((acc, [key, val]) => (
        val ? `${acc}&${key}=${val}` : acc
      ), '/api/logos/list?'),
    );
    const raw: LogosList = await res.json();

    return raw;
  }

  clearItems() {
    this.items = [];
  }

  addItems(raw: LogosList) {
    this.items = [...this.items, ...raw.data.map((item) => (
      <li key={item.slug}>
        <LogosItem item={item} />
      </li>
    ))];
  }

  /**
   * Search
   */

  _prevuesSearch: string | null = null;

  processSearch(ev: React.SyntheticEvent) {
    debounce(() => {
      const prev = this._prevuesSearch;
      const raw = (ev.target as HTMLInputElement).value;
      const val = raw.trim();

      if (prev === val && raw.match(/\s*$/)[0].length !== 1) return;
      if (prev && !this.isItems && val.length > prev.length) return;
      if (!prev && this.isItems && !val) return;

      this.resetQuery(!val ? {} : { name: escapeStr(val) });
      this.uploadItemsFromScratch();

      this._prevuesSearch = val;
    }, 100)();
  }

  /**
   * Query
   */

  query = getQueryInst();

  resetQuery(query = {}) {
    this.query = Object.assign(getQueryInst(), query);
  }

  upPage() {
    this.query.page += 1;
  }
}

export default new LogosStore();
