import type { LogosFilterParameters, LogosStore } from '../../types';
import { initFilterSearch } from './search';
import type { FilterSizeOptions } from './size';
import { initFilterSize } from './size';
import type { FilterSortByOptions } from './sort-by';
import { initFilterSortBy } from './sort-by';

export function initFilter(
  this: LogosStore,
  opts: {
    multiplier: LogosFilterParameters['multiplier'];
    size: FilterSizeOptions;
    sortBy: FilterSortByOptions;
  },
): void {
  Object.defineProperties(this, {
    filter: {
      value: {
        params: {
          multiplier: opts.multiplier,
          search: {},
          size: {},
          sortBy: {},
        },
      },
      enumerable: true,
    },
  });

  initFilterSearch.call(this);
  initFilterSize.call(this.filter.params.size, opts.size);
  initFilterSortBy.call(this, opts.sortBy);

  Object.defineProperties(this.filter.params, {
    isActive: {
      get: () => (
        !![
          this.filter.params.search,
          this.filter.params.size,
          this.filter.params.sortBy,
        ].find((pr) => pr.isActive)
      ),
      enumerable: true,
    },
  });

  this.filter.reset = () => {
    const { search, size, sortBy } = this.filter.params;

    if (search.isActive || sortBy.isActive) {
      if (search.isActive) search.reset();
      if (sortBy.isActive) sortBy.reset();

      this.list.reset();
    }

    if (size.isActive) size.reset();
  };
}
