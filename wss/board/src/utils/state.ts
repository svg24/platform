import { useState } from 'react';
import type { StateAnimation } from 'types/state';

export function getStateAnimation(
  ref: React.RefObject<HTMLDivElement>,
  el: string,
): StateAnimation {
  const root = {
    get ls() {
      return ref?.current?.classList;
    },
    mods: {
      display: `${el}-display`,
      in: `${el}-in`,
      out: `${el}-out`,
    },
  };

  return {
    _ms: 300,
    _isShowed: useState<boolean>(false),
    get isShowed() {
      return this._isShowed[0];
    },
    set isShowed(value) {
      this._isShowed[1](value);
    },
    get isDisplay() {
      return !!root.ls?.contains(root.mods.display);
    },
    show() {
      root.ls?.add(root.mods.display);
      root.ls?.add(root.mods.in);
      setTimeout(() => {
        root.ls?.remove(root.mods.in);
      }, this._ms);
    },
    hide() {
      return new Promise((resolve) => {
        root.ls?.add(root.mods.out);
        setTimeout(() => {
          root.ls?.remove(root.mods.display);
          root.ls?.remove(root.mods.out);
          resolve();
        }, this._ms);
      });
    },
  };
}
