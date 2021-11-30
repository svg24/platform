import type { LogosStore } from 'types/modules/logos';
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
  initSortBy.call(this);

  this.filter.mount = async () => {
    await this.filter.categories.fetch();
    await this.filter.companies.fetch();
  };

  this.filter.reset = () => {
    if (this.filter.sortBy.isActive) this.filter.sortBy.reset();
  };
}
