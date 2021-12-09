import { initStore } from 'src/utils';
import type { FilterStore as Store } from 'types/filter';
import { initParameter } from './parameter';

export const FilterStore = new (function (this: Store) {
  initStore.call(this);
  initParameter.call(this, 'category');
  initParameter.call(this, 'company');
  initParameter.call(this, 'sortBy');

  Object.defineProperty(this, 'getApplied', {
    get: () => [
      this.sortBy,
      this.category,
      this.company,
    ].filter((pr) => pr.isApplied),
    enumerable: true,
  });

  this.mount = async () => {
    await this.sortBy.fetch();
    await this.category.fetch();
    await this.company.fetch();
  };

  this.reset = () => {
    if (this.sortBy.isApplied) this.sortBy.reset();
    if (this.category.isApplied) this.category.reset();
    if (this.company.isApplied) this.company.reset();
  };
} as any as { new (): Store })();
