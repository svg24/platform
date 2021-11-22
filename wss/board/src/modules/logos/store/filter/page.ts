import type { LogosFilterPage } from '../../types';

export type FilterPageOptions = {
  def: number;
  id: string;
};

export const initFilterPage = function (
  this: LogosFilterPage,
  opts: FilterPageOptions,
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
};
