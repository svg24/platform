import { reaction } from 'mobx';
import { useEffect, useRef } from 'react';
import { Filter } from 'src/modules/filter';
import { deepAssign, getStateAnimation } from 'src/utils';
import { LayoutStore } from '../../store';
import { LayoutMainContainer } from './LayoutMainContainer';

export function LayoutMain({
  children,
}: {
  children: JSX.Element;
}): JSX.Element {
  const { ctx } = LayoutStore;

  const root = {
    ref: useRef<HTMLDivElement>(null),
  };

  const filter = deepAssign({
    mount() {
      useEffect(() => {
        reaction(() => ctx.main.filter.isVisible, filter.toggle);
      }, []);
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
