import type {
  LogosFilterSelect,
  LogosFilterSelectOptions,
  LogosStore,
} from 'src/types';
import { deepObjectAssign } from 'src/utils';
import { FilterSelect } from './select';

export const FilterSortBy = function (
  this: LogosFilterSelect,
  store: LogosStore,
  opts: LogosFilterSelectOptions,
): void {
  deepObjectAssign(this, new FilterSelect(opts));

  this.onChange = (val) => {
    this.val.cur = val;

    store.list.reset();
  };
} as any as {
  new (
    store: LogosStore,
    opts: LogosFilterSelectOptions,
  ): LogosFilterSelect;
};
