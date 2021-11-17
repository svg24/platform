// import {
//   action,
//   computed,
//   makeObservable,
//   observable,
// } from 'mobx';
import type { LogosStore } from '../types';

export function initBag(this: LogosStore): void {
  this.bag = {
    items: undefined,

    // open() {
    //   this.isOpen = true;
    // },

    // close() {
    //   this.isOpen = false;
    // },

    add(item) {
      this.items = [item];
    },

    clear() {
      this.items = undefined;
    },
  };

  // makeObservable(this.bag, {
  //   _isOpen: observable,
  //   isOpen: computed,
  //   open: action,
  //   close: action,
  // });
}
