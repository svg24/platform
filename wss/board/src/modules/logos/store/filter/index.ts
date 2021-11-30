// import {
//   action,
//   computed,
//   makeObservable,
//   observable,
// } from 'mobx';
import type { LogosStore } from 'types/modules/logos';
import { initSearch } from './search';
import { initSimple } from './simple';
import { initSortBy } from './sort-by';

export function initFilter(this: LogosStore): void {
  Object.defineProperties(this, {
    filter: {
      value: {
        params: {
          multiplier: undefined,
          search: {},
        },
        isMounted: false,
      },
      enumerable: true,
    },
  });

  initSimple.call(this, 'categories');
  initSimple.call(this, 'companies');
  initSearch.call(this);
  initSortBy.call(this);

  this.filter.mount = async () => {
    await this.filter.params.categories.fetch();
    await this.filter.params.companies.fetch();

    this.filter.isMounted = true;
  };

  Object.defineProperties(this.filter, {
    isActive: {
      get: () => (
        !![
          this.filter.params.categories,
          this.filter.params.companies,
          this.filter.params.search,
          this.filter.params.sortBy,
        ].find((pr) => pr.isActive)
      ),
      enumerable: true,
    },
  });

  this.filter.reset = () => {
    const { search, sortBy } = this.filter.params;

    if (search.isActive || sortBy.isActive) {
      if (search.isActive) search.reset();
      if (sortBy.isActive) sortBy.reset();

      this.list.reset();
    }
  };
}
