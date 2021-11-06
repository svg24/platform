import type { LogosFilterPage, LogosFilterPageOptions } from 'src/types';

export const FilterPage = function (
  this: LogosFilterPage,
  opts: LogosFilterPageOptions,
): void {
  this.id = opts.id;
  this.val = {
    _def: opts.def,
    cur: opts.def,
  };

  this.next = () => {
    this.val.cur += 1;
  };
  this.reset = () => {
    this.val.cur = this.val._def;
  };
} as any as {
  new (opts: LogosFilterPageOptions): LogosFilterPage;
};
