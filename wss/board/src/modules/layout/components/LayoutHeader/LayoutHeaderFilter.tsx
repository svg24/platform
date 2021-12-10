import { AdjustmentsIcon, XIcon } from '@heroicons/react/outline';
import { reaction } from 'mobx';
import { observer } from 'mobx-react-lite';
import { useEffect, useRef } from 'react';
import { ContentStore } from 'src/modules/content';
import { FilterStore } from 'src/modules/filter';
import { deepAssign, getStateAnimation } from 'src/utils';
import { LayoutStore } from '../../store';
import { LayoutHeaderButton } from './LayoutHeaderButton';
import { LayoutHeaderIcon } from './LayoutHeaderIcon';

export function LayoutHeaderFilter(): JSX.Element {
  const layoutCtx = LayoutStore.ctx;
  const filterCtx = FilterStore.ctx;
  const contentCtx = ContentStore.ctx;

  const root = {
    ref: useRef<HTMLDivElement>(null),
  };

  const counter = deepAssign({
    el: observer(() => (
      <span className="layout-header__counter">
        {filterCtx.getApplied.length}
      </span>
    )),
    mount() {
      useEffect(() => {
        reaction(() => (
          filterCtx.getApplied.length && layoutCtx.main.filter.isVisible
        ), counter.toggle);
      }, []);
    },
    toggle() {
      if (!filterCtx.getApplied.length || layoutCtx.main.filter.isVisible) {
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
      filterCtx.reset();
      contentCtx.list.reset();
    },
  }, getStateAnimation(root.ref, 'layout-header__filter_counter'));

  counter.mount();

  return (
    <div
      className="layout-header__filter"
      ref={root.ref}
    >
      <LayoutHeaderButton onClick={layoutCtx.main.filter.toggle}>
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
