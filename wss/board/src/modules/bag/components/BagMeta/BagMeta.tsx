import {
  Link,
  List,
  ListItem,
  PseudoLink,
} from 'src/components';
import { LayoutStore } from 'src/modules/layout';
import { BagStore } from '../../store';

export function BagMeta(): JSX.Element {
  const layoutCtx = LayoutStore.ctx;
  const bagCtx = BagStore.ctx;

  const general = {
    list: bagCtx.item.meta
      ? [{
        id: 'category',
        label: 'Category',
        meta: bagCtx.item.meta.category,
      }, {
        id: 'company',
        label: 'Company',
        meta: bagCtx.item.meta.company,
      }]
      : [],
    onClick: (id: string) => {
      layoutCtx.bag.hide();
    },
  };

  const individual = {
    list: bagCtx.item.data
      ? [{
        id: 'version',
        label: 'Version',
        meta: new Date(bagCtx.item.data?.version).toLocaleString('en', {
          year: 'numeric',
        }),
      }]
      : [],
  };

  return (
    <section>
      {bagCtx.item.meta?.src.usage
        ? (
          <p>
            {'Before use, it is recommended to read the '}
            <Link href={bagCtx.item.meta.src.usage}>
              usage guide
            </Link>
            .
          </p>
        )
        : <></>}
      <List>
        {general.list.length
          ? general.list.map((item) => (
            <ListItem key={item.id}>
              <span>
                {`${item.label}: `}
              </span>
              <PseudoLink
                onClick={() => {
                  general.onClick(item.id);
                }}
              >
                {item.meta?.name}
              </PseudoLink>
            </ListItem>
          ))
          : {}}
        {individual.list.length
          ? individual.list.map((item) => (
            <ListItem key={item.id}>
              {`${item.label}: ${item.meta}`}
            </ListItem>
          ))
          : {}}
      </List>
    </section>
  );
}
