import { AdjustmentsIcon, XIcon } from '@heroicons/react/outline';
import { reaction } from 'mobx';
import { observer } from 'mobx-react-lite';
import { forwardRef, useRef, useState } from 'react';
import { Transition } from 'src/components';
import { useStore } from 'src/store';
import { LayoutHeaderButton } from './LayoutHeaderButton';
import { LayoutHeaderIcon } from './LayoutHeaderIcon';

const LayoutHeaderFilterCounter = forwardRef(() => {
  const { content, filter } = useStore();
  const LayoutHeaderFilterCounterObserved = observer(() => (
    <span className="layout-header__counter">
      {filter.applied.length}
    </span>
  ));

  const handleClick = (): void => {
    filter.reset();
    content.list.reset();
  };

  return (
    <>
      <LayoutHeaderFilterCounterObserved />
      <LayoutHeaderButton onClick={handleClick}>
        <LayoutHeaderIcon icon={XIcon} />
      </LayoutHeaderButton>
    </>
  );
});

export function LayoutHeaderFilter(): JSX.Element {
  const { filter, layout } = useStore();
  const rootRef = useRef<HTMLDivElement>(null);
  const [counterIsVisible, setCounterIsVisible] = useState(false);

  reaction(() => filter.applied.length && layout.main.filter.isVisible, () => {
    if (!filter.applied.length || layout.main.filter.isVisible) {
      const doneEnter = 'layout-header__filter_counter_done-enter';
      if (rootRef.current?.classList.contains(doneEnter)) {
        setCounterIsVisible(false);
      }
    } else {
      setCounterIsVisible(true);
    }
  });

  return (
    <div
      className="layout-header__filter"
      ref={rootRef}
    >
      <LayoutHeaderButton onClick={layout.main.filter.toggle}>
        <LayoutHeaderIcon icon={AdjustmentsIcon} />
      </LayoutHeaderButton>
      <Transition
        classNames="layout-header__filter_counter"
        isVisible={counterIsVisible}
        rootRef={rootRef}
      >
        <LayoutHeaderFilterCounter />
      </Transition>
    </div>
  );
}
