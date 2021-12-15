import { Link, List } from 'src/components';
import { useStore } from 'src/store';
import { BagMetaGeneral } from './BagMetaGeneral';
import { BagMetaIndividual } from './BagMetaIndividual';

export function BagMeta(): JSX.Element {
  const { bag } = useStore();

  return (
    <section>
      {bag.item.meta?.src.usage
        ? (
          <p>
            {'Before use, it is recommended to read the '}
            <Link href={bag.item.meta.src.usage}>
              usage guide
            </Link>
            .
          </p>
        )
        : <></>}
      <List>
        <BagMetaGeneral />
        <BagMetaIndividual />
      </List>
    </section>
  );
}
