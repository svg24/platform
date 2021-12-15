import type { Store } from 'types/filter';

export function initRoot(this: Store): void {
  Object.defineProperty(this, 'applied', {
    enumerable: true,
    get: () => [
      this.sortBy,
      this.category,
      this.company,
    ].filter((pr) => pr.isApplied),
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
}
