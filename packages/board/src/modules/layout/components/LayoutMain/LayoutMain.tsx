import { reaction } from 'mobx';
import { useEffect, useRef, useState } from 'react';
import { Transition } from 'src/components';
import { Filter } from 'src/modules/filter';
import { useStore } from 'src/store';
import { LayoutMainContainer } from './LayoutMainContainer';

function LayoutMain({ children }: { children: JSX.Element }): JSX.Element {
  const { layout, settings } = useStore();
  const { filter } = layout.main;
  const rootRef = useRef<HTMLDivElement>(null);
  const [filterIsVisible, setFilterIsVisible] = useState(filter.isVisible);

  function mount(): void {
    if (filter.isVisible) {
      setFilterIsVisible(true);
    } else {
      setFilterIsVisible(false);
    }
  }

  useEffect(() => {
    mount();
    reaction(() => filter.isVisible, mount);
    reaction(() => settings.filter.value.current, () => {
      filter.mount();
      mount();
    });
  }, []);

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
