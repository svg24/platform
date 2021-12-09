import { reaction } from 'mobx';
import { useEffect, useRef, useState } from 'react';
import { Filter } from 'src/modules/filter';
import { LayoutStore } from '../../store';
import { LayoutMainContainer } from './LayoutMainContainer';

export const LayoutMain = ({
  children,
}: {
  children: JSX.Element;
}): JSX.Element => {
  const { ctx } = LayoutStore;

  const root = {
    ref: useRef<HTMLDivElement>(null),
    get ls() {
      return root.ref.current?.classList;
    },
  };

  const filter = {
    mount() {
      useEffect(() => {
        reaction(() => ctx.main.filter.isVisible, filter.toggle);
      });
    },
    toggle() {
      if (ctx.main.filter.isVisible) {
        filter.isShowed = true;
        filter.show();
      } else {
        filter.hide().then(() => {
          filter.isShowed = false;
        });
      }
    },
    _ms: 300,
    _isShowed: useState(false),
    get isShowed() {
      return filter._isShowed[0];
    },
    set isShowed(val) {
      filter._isShowed[1](val);
    },
    show() {
      root.ls?.add('layout-main_filter-display');
      root.ls?.add('layout-main_filter-in');
      setTimeout(() => {
        root.ls?.remove('layout-main_filter-in');
      }, filter._ms);
    },
    hide(): Promise<void> {
      return new Promise((resolve) => {
        root.ls?.add('layout-main_filter-out');
        setTimeout(() => {
          root.ls?.remove('layout-main_filter-out');
          root.ls?.remove('layout-main_filter-display');
          resolve();
        }, filter._ms);
      });
    },
  };

  filter.mount();

  return (
    <main
      className="layout-main"
      ref={root.ref}
    >
      {filter.isShowed ? <Filter /> : <></>}
      <LayoutMainContainer>
        {children}
      </LayoutMainContainer>
    </main>
  );
};
