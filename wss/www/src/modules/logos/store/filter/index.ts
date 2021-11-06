import type { LogosFilterParameters, LogosStore } from 'src/types';
import { FilterPage } from './page';
import { FilterSearch } from './search';
import { FilterSize } from './size';
import { FilterSortBy } from './sort-by';

export {
  FilterPage,
  FilterSearch,
  FilterSize,
  FilterSortBy,
};

export function initFilter(
  this: LogosStore,
  params: LogosFilterParameters,
): void {
  this.filter = {
    params,

    get isActive() {
      return !![
        this.params.search,
        this.params.size,
        this.params.sortBy,
      ].find((pr) => pr.isActive);
    },

    reset: () => {
      const { search, size, sortBy } = this.filter.params;

      if (search.isActive || sortBy.isActive) {
        if (search.isActive) search.reset();
        if (sortBy.isActive) sortBy.reset();

        this.list.reset();
      }

      if (size.isActive) size.reset();
    },
  };
}
