import { ListItem } from 'src/components';
import { useStore } from 'src/store';

type BagMetaIndividualItem = {
  id: string;
  label: string;
  meta?: string;
};

export function BagMetaIndividual(): JSX.Element {
  const { bag } = useStore();

  const version: BagMetaIndividualItem = {
    id: 'version',
    label: 'Version',
    ...bag.item.data
      ? {
        meta: new Date(bag.item.data?.version).toLocaleString('en', {
          year: 'numeric',
        }),
      }
      : {},
  };

  return (
    <>
      {[version].map((prop) => (
        <ListItem key={prop.id}>
          {`${prop.label}: ${prop.meta}`}
        </ListItem>
      ))}
    </>
  );
}
