import type { LogosStore } from 'types/modules/logos';
import { initSearch } from './search';
import { initSimple } from './simple';
import { initSortBy } from './sort-by';

export function initFilter(this: LogosStore): void {
  Object.defineProperties(this, {
    filter: {
      value: {
        multiplier: undefined,
      },
      enumerable: true,
    },
  });

  initSimple.call(this, 'categories');
  initSimple.call(this, 'companies');
  initSearch.call(this);
  initSortBy.call(this);

  this.filter.mount = async () => {
    await this.filter.categories.fetch();
    await this.filter.companies.fetch();
  };

  this.filter.reset = () => {
    const { search, sortBy } = this.filter;

    if (search.isActive || sortBy.isActive) {
      if (search.isActive) search.reset();
      if (sortBy.isActive) sortBy.reset();

      this.list.reset();
    }
  };
}
