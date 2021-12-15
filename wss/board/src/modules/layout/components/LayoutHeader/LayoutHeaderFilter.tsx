import { AdjustmentsIcon, XIcon } from '@heroicons/react/outline';
import { reaction } from 'mobx';
import { observer } from 'mobx-react-lite';
import { useEffect, useRef } from 'react';
import { useStore } from 'src/store';
import { deepAssign, getStateAnimation } from 'src/utils';
import { LayoutHeaderButton } from './LayoutHeaderButton';
import { LayoutHeaderIcon } from './LayoutHeaderIcon';

export function LayoutHeaderFilter(): JSX.Element {
  const { content, filter, layout } = useStore();

  const root = {
    ref: useRef<HTMLDivElement>(null),
  };

  const counter = deepAssign({
    el: observer(() => (
      <span className="layout-header__counter">
        {filter.applied.length}
      </span>
    )),
    mount() {
      useEffect(() => {
        reaction(() => (
          filter.applied.length && layout.main.filter.isVisible
        ), counter.toggle);
      }, []);
    },
    toggle() {
      if (!filter.applied.length || layout.main.filter.isVisible) {
        if (counter.isDisplay) {
          counter.hide().then(() => {
            counter.isShowed = false;
          });
        }
      } else {
        counter.isShowed = true;
        counter.show();
      }
    },
    reset() {
      filter.reset();
      content.list.reset();
    },
  }, getStateAnimation(root.ref, 'layout-header__filter_counter'));

  counter.mount();

  return (
    <div
      className="layout-header__filter"
      ref={root.ref}
    >
      <LayoutHeaderButton onClick={layout.main.filter.toggle}>
        <LayoutHeaderIcon icon={AdjustmentsIcon} />
      </LayoutHeaderButton>
      {counter.isDisplay
        ? (
          <>
            <counter.el />
            <LayoutHeaderButton onClick={counter.reset}>
              <LayoutHeaderIcon icon={XIcon} />
            </LayoutHeaderButton>
          </>
        )
        : <></>}
    </div>
  );
}
