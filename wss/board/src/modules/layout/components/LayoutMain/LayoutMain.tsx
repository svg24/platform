import { reaction } from 'mobx';
import { useEffect, useRef } from 'react';
import { Filter } from 'src/modules/filter';
import { useStore } from 'src/store';
import { deepAssign, getStateAnimation } from 'src/utils';
import { LayoutMainContainer } from './LayoutMainContainer';

export function LayoutMain({
  children,
}: {
  children: JSX.Element;
}): JSX.Element {
  const { layout } = useStore();

  const root = {
    ref: useRef<HTMLDivElement>(null),
  };

  const filter = deepAssign({
    mount() {
      useEffect(() => {
        reaction(() => layout.main.filter.isVisible, filter.toggle);
      }, []);
    },
    toggle() {
      if (layout.main.filter.isVisible) {
        filter.isShowed = true;
        filter.show();
      } else {
        filter.hide().then(() => {
          filter.isShowed = false;
        });
      }
    },
  }, getStateAnimation(root.ref, 'layout-main_filter'));

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
}
