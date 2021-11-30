import { initStore } from 'src/utils';
import type { FilterStore as Store } from 'types/filter';
import { initParameter } from './parameter';

export const FilterStore = new (function (this: Store) {
  initStore.call(this);

  this.multiplier = undefined;

  initParameter.call(this, 'category');
  initParameter.call(this, 'company');
  initParameter.call(this, 'sortBy');

  this.mount = async () => {
    await this.sortBy.fetch();
    await this.category.fetch();
    await this.company.fetch();
  };

  this.reset = () => {
    if (this.sortBy.isActive) this.sortBy.reset();
  };
} as any as { new (): Store })();
