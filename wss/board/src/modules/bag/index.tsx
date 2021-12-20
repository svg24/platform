import { Portal } from 'src/components';
import { BagContent } from './components/BagContent';
import { BagHeading } from './components/BagHeading';
import { BagMeta } from './components/BagMeta';
import { BagRoot } from './components/BagRoot';
import { BagSettings } from './components/BagSettings';
import { BagView } from './components/BagView';
import { BagStore } from './store';

function Bag(): JSX.Element {
  return (
    <Portal>
      <BagRoot>
        <BagHeading />
        <BagMeta />
        <BagView />
        <BagSettings />
        <BagContent />
      </BagRoot>
    </Portal>
  );
}

export { Bag, BagStore };
