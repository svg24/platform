import { BagContent } from './components/BagContent';
import { BagForm } from './components/BagForm';
import { BagHeading } from './components/BagHeading';
import { BagMeta } from './components/BagMeta';
import { BagRoot } from './components/BagRoot';
import { BagView } from './components/BagView';
import { BagStore } from './store';

export { BagStore };

export function Bag(): JSX.Element {
  return (
    <BagRoot>
      <BagHeading />
      <BagMeta />
      <BagView />
      <BagForm />
      <BagContent />
    </BagRoot>
  );
}
