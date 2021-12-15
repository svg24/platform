import { reaction } from 'mobx';
import { createRef, useEffect } from 'react';
import { Bag } from 'src/modules/bag';
import { useStore } from 'src/store';
import { deepAssign, getStateAnimation } from 'src/utils';
import { LayoutFooter } from './components/LayoutFooter';
import { LayoutHeader } from './components/LayoutHeader';
import { LayoutMain } from './components/LayoutMain';
import { LayoutRoot } from './components/LayoutRoot';
import { LayoutStore } from './store';

export { LayoutStore };

const root = {
  ref: createRef<HTMLDivElement>(),
};

export function Layout({ children }: { children: JSX.Element }): JSX.Element {
  const { layout } = useStore();

  const bag = deepAssign({
    mount() {
      useEffect(() => {
        reaction(() => layout.bag.isVisible, bag.toggle);
      }, []);
    },
    toggle() {
      if (layout.bag.isVisible) {
        bag.isShowed = true;
        bag.show();
      } else {
        bag.hide().then(() => {
          bag.isShowed = false;
        });
      }
    },
  }, getStateAnimation(root.ref, 'layout-root_bag'));

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
