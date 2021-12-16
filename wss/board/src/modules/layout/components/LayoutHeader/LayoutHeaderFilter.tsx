import { AdjustmentsIcon, XIcon } from '@heroicons/react/outline';
import { reaction } from 'mobx';
import { observer } from 'mobx-react-lite';
import type { RefObject } from 'react';
import { useEffect, useRef } from 'react';
import { useStore } from 'src/store';
import { deepAssign, getStateAnimation } from 'src/utils';
import { LayoutHeaderButton } from './LayoutHeaderButton';
import { LayoutHeaderIcon } from './LayoutHeaderIcon';

function LayoutHeaderFilterCounter({
  rootRef,
}: {
  rootRef: RefObject<HTMLDivElement>;
}): JSX.Element {
  const { content, filter, layout } = useStore();
  const LayoutHeaderFilterCounterObserved = observer(() => (
    <span className="layout-header__counter">
      {filter.applied.length}
    </span>
  ));
  const counter = deepAssign({
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
  }, getStateAnimation(rootRef, 'layout-header__filter_counter'));

  useEffect(() => {
    reaction(() => (
      filter.applied.length && layout.main.filter.isVisible
    ), counter.toggle);
  }, []);

  return counter.isDisplay
    ? (
      <>
        <LayoutHeaderFilterCounterObserved />
        <LayoutHeaderButton onClick={counter.reset}>
          <LayoutHeaderIcon icon={XIcon} />
        </LayoutHeaderButton>
      </>
    )
    : <></>;
}

export function LayoutHeaderFilter(): JSX.Element {
  const { layout } = useStore();
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div
      className="layout-header__filter"
      ref={ref}
    >
      <LayoutHeaderButton onClick={layout.main.filter.toggle}>
        <LayoutHeaderIcon icon={AdjustmentsIcon} />
      </LayoutHeaderButton>
      <LayoutHeaderFilterCounter rootRef={ref} />
    </div>
  );
}
