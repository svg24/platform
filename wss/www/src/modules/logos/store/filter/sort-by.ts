import type { LogosFilterSelect, LogosStore } from '../../types';
import type { FilterSelectOptions } from './select';
import { initFilterSelect } from './select';

export type FilterSortByOptions = FilterSelectOptions;

export const initFilterSortBy = function (
  this: LogosStore,
  opts: FilterSortByOptions,
): void {
  initFilterSelect.call(this.filter.params.sortBy, opts);
  Object.defineProperties(this, {
    onChange: <{ value: LogosFilterSelect['onChange'] }>{
      value: (val) => {
        this.filter.params.sortBy.val.cur = val;

        this.list.reset();
      },
    },
  });
};
