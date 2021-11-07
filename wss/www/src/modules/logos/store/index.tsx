import type { LogosStore as Store } from 'src/types';
import { initBase } from 'src/utils';
import {
  FilterPage,
  FilterSearch,
  FilterSize,
  FilterSortBy,
  initFilter,
} from './filter';
import { initList } from './list';

const LogosStore = function (this: Store) {
  initBase.call(this);
  initList.call(this, this);
  initFilter.call(this, {
    page: new FilterPage({
      id: 'page',
      def: 1,
    }),
    search: new FilterSearch(this, { id: 'name' }),
    size: new FilterSize({
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
    }),
    sortBy: new FilterSortBy(this, {
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
    }),
  });
} as any as { new (): Store };

export default new LogosStore();
