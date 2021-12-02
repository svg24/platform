import { reaction } from 'mobx';
import { createRef, useEffect, useState } from 'react';
import { LayoutFooter } from './components/LayoutFooter';
import { LayoutHeader } from './components/LayoutHeader';
import { LayoutMain } from './components/LayoutMain';
import { LayoutRoot } from './components/LayoutRoot';
import { LayoutSidebar } from './components/LayoutSidebar';
import { LayoutStore } from './store';

export { LayoutStore };

const root = {
  ref: createRef<HTMLDivElement>(),
  get ls() {
    return root.ref?.current?.classList;
  },
};

export const Layout = ({
  children,
}: {
  children: JSX.Element;
}): JSX.Element => {
  const { ctx } = LayoutStore;

  const sidebar = {
    mount() {
      useEffect(() => {
        reaction(() => ctx.sidebar.isVisible, sidebar.toggle);
      }, []);
    },
    toggle() {
      if (ctx.sidebar.isVisible) {
        sidebar.isShowed = true;
        sidebar.show();
      } else {
        sidebar.hide().then(() => {
          sidebar.isShowed = false;
        });
      }
    },
    _ms: 300,
    _isShowed: useState(false),
    get isShowed() {
      return sidebar._isShowed[0];
    },
    set isShowed(val) {
      sidebar._isShowed[1](val);
    },
    show() {
      root.ls?.add('layout-root_sidebar-display');
      root.ls?.add('layout-root_sidebar-in');
      setTimeout(() => {
        root.ls?.remove('layout-root_sidebar-in');
      }, sidebar._ms);
    },
    hide(): Promise<void> {
      return new Promise((resolve) => {
        root.ls?.add('layout-root_sidebar-out');
        setTimeout(() => {
          root.ls?.remove('layout-root_sidebar-out');
          root.ls?.remove('layout-root_sidebar-display');
          resolve();
        }, sidebar._ms);
      });
    },
  };

  sidebar.mount();

  return (
    <LayoutRoot ref={root.ref}>
      <LayoutHeader />
      <LayoutMain>
        {children}
      </LayoutMain>
      {sidebar.isShowed ? <LayoutSidebar /> : <></>}
      <LayoutFooter />
    </LayoutRoot>
  );
};
