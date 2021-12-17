import { reaction } from 'mobx';
import { useState } from 'react';
import { Portal, Transition } from 'src/components';
import { useStore } from 'src/store';
import { BagContent } from './components/BagContent';
import { BagHeading } from './components/BagHeading';
import { BagMeta } from './components/BagMeta';
import { BagRoot } from './components/BagRoot';
import { BagSettings } from './components/BagSettings';
import { BagView } from './components/BagView';
import { BagStore } from './store';

function Bag(): JSX.Element {
  const { layout } = useStore();
  const [bagIsVisible, setBagIsVisible] = useState(false);

  reaction(() => layout.bag.isVisible, () => {
    if (layout.bag.isVisible) {
      setBagIsVisible(true);
    } else {
      setBagIsVisible(false);
    }
  });

  return (
    <Portal>
      <Transition
        classNames="bag-root"
        isVisible={bagIsVisible}
      >
        <BagRoot>
          <BagHeading />
          <BagMeta />
          <BagView />
          <BagSettings />
          <BagContent />
        </BagRoot>
      </Transition>
    </Portal>
  );
}

export { Bag, BagStore };
