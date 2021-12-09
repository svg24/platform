import { reaction } from 'mobx';
import { createRef, useEffect, useState } from 'react';
import { Bag } from 'src/modules/bag';
import { LayoutFooter } from './components/LayoutFooter';
import { LayoutHeader } from './components/LayoutHeader';
import { LayoutMain } from './components/LayoutMain';
import { LayoutRoot } from './components/LayoutRoot';
import { LayoutStore } from './store';

export { LayoutStore };

const root = {
  ref: createRef<HTMLDivElement>(),
  get ls() {
    return root.ref?.current?.classList;
  },
};

export function Layout({
  children,
}: {
  children: JSX.Element;
}): JSX.Element {
  const { ctx } = LayoutStore;

  const bag = {
    mount() {
      useEffect(() => {
        reaction(() => ctx.bag.isVisible, bag.toggle);
      }, []);
    },
    toggle() {
      if (ctx.bag.isVisible) {
        bag.isShowed = true;
        bag.show();
      } else {
        bag.hide().then(() => {
          bag.isShowed = false;
        });
      }
    },
    _ms: 300,
    _isShowed: useState(false),
    get isShowed() {
      return bag._isShowed[0];
    },
    set isShowed(val) {
      bag._isShowed[1](val);
    },
    show() {
      root.ls?.add('layout-root_bag-display');
      root.ls?.add('layout-root_bag-in');
      setTimeout(() => {
        root.ls?.remove('layout-root_bag-in');
      }, bag._ms);
    },
    hide(): Promise<void> {
      return new Promise((resolve) => {
        root.ls?.add('layout-root_bag-out');
        setTimeout(() => {
          root.ls?.remove('layout-root_bag-out');
          root.ls?.remove('layout-root_bag-display');
          resolve();
        }, bag._ms);
      });
    },
  };

  bag.mount();

  return (
    <LayoutRoot ref={root.ref}>
      <LayoutHeader />
      <LayoutMain>
        {children}
      </LayoutMain>
      {bag.isShowed ? <Bag /> : <></>}
      <LayoutFooter />
    </LayoutRoot>
  );
}
