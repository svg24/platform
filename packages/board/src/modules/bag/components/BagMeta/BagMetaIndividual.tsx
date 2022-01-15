import { ListItem } from 'src/components';
import { useStore } from 'src/store';
import type { MetaIndividualItem } from 'types/bag';

export function BagMetaIndividual(): JSX.Element {
  const { bag } = useStore();
  const version: MetaIndividualItem = {
    id: 'version',
    label: 'Version',
    meta: bag.item.data
      ? new Date(bag.item.data?.meta.version).toLocaleString('en', {
        year: 'numeric',
      })
      : undefined,
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
