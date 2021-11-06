import type {
  LogosFilterSelect,
  LogosFilterSelectOptions,
  LogosStore,
} from 'src/types';
import { deepAssign } from 'src/utils/obj';
import { FilterSelect } from './select';

export const FilterSortBy = function (
  this: LogosFilterSelect,
  store: LogosStore,
  opts: LogosFilterSelectOptions,
): void {
  deepAssign(this, new FilterSelect(opts));

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
