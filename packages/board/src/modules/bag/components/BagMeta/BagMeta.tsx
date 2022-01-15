import { Link, List } from 'src/components';
import { useStore } from 'src/store';
import { BagMetaGeneral } from './BagMetaGeneral';
import { BagMetaIndividual } from './BagMetaIndividual';

export function BagMeta(): JSX.Element {
  const { bag } = useStore();

  return (
    <section>
      {bag.item.meta?.usage
        ? (
          <p>
            {'Before use, it is recommended to read the '}
            <Link href={bag.item.meta.usage}>
              usage guide
            </Link>
            .
          </p>
        )
        : null}
      <List>
        <BagMetaGeneral />
        <BagMetaIndividual />
      </List>
    </section>
  );
}
