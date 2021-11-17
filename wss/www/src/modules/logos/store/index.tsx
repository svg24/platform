import { initStore } from 'src/utils';
import type { LogosStore as Store } from '../types';
import { initBag } from './bag';
import { initFilter } from './filter';
import { initList } from './list';
import { initSentinel } from './sentinel';

export const LogosStore = new (function (this: Store) {
  initStore.call(this);
  initFilter.call(this, {
    initPage: 1,
    page: {
      id: 'page',
      def: 1,
    },
    search: {
      id: 'name',
    },
    size: {
      id: 'size',
      name: 'Size',
      def: 'base',
      opts: [{
        name: 'small',
        val: 'sm',
      }, {
        name: 'base',
        val: 'base',
      }, {
        name: 'large',
        val: 'lg',
      }],
    },
    sortBy: {
      id: 'sortBy',
      name: 'Sort by',
      def: 'date',
      opts: [{
        name: 'date',
        val: 'date',
      }, {
        name: 'name',
        val: 'name',
      }],
    },
  });
  initList.call(this);
  initSentinel.call(this);
  initBag.call(this);
} as any as { new (): Store })();
