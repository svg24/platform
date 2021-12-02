import { ShoppingBagIcon } from '@heroicons/react/outline';
import { reaction } from 'mobx';
import { useEffect, useRef, useState } from 'react';
import { LayoutStore } from '../../store';
import { LayoutMainContainer } from './LayoutMainContainer';
import { LayoutMainFilter } from './LayoutMainFilter';

export const LayoutMain = (
  { children }: { children: JSX.Element },
): JSX.Element => {
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
    get isDisplay() {
      return root.ls?.contains('layout-main_filter-display');
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
    show() {
      root.ls?.add('layout-main_filter-display');
      root.ls?.add('layout-main_filter-in');
      setTimeout(() => {
        root.ls?.remove('layout-main_filter-in');
      }, filter._ms);
    },
  };

  filter.mount();

  const bag = {
    icon: ShoppingBagIcon,
    onClick: () => {},
  };

  return (
    <main
      className="layout-main"
      ref={root.ref}
    >
      {filter.isDisplay ? <LayoutMainFilter /> : <></>}
      <LayoutMainContainer>
        {children}
      </LayoutMainContainer>
      <div className="layout-main__actions">
        <button
          className="layout-main__btn"
          type="button"
          onClick={bag.onClick}
        >
          <bag.icon className="layout-main__icon" />
        </button>
      </div>
    </main>
  );
};
