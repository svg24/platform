import { reaction } from 'mobx';
import { useRef, useState } from 'react';
import { Transition } from 'src/components';
import { Filter } from 'src/modules/filter';
import { useStore } from 'src/store';
import { LayoutMainContainer } from './LayoutMainContainer';

function LayoutMain({ children }: { children: JSX.Element }): JSX.Element {
  const { layout } = useStore();
  const rootRef = useRef<HTMLDivElement>(null);
  const [filterIsVisible, setFilterIsVisible] = useState(false);

  reaction(() => layout.main.filter.isVisible, () => {
    if (layout.main.filter.isVisible) {
      setFilterIsVisible(true);
    } else {
      setFilterIsVisible(false);
    }
  });

  return (
    <main
      className="layout-main"
      ref={rootRef}
    >
      <Transition
        classNames="layout-main_filter"
        isVisible={filterIsVisible}
        rootRef={rootRef}
      >
        <Filter />
      </Transition>
      <LayoutMainContainer>
        {children}
      </LayoutMainContainer>
    </main>
  );
}

export { LayoutMain };
