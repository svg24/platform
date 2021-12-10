import {
  Link,
  List,
  ListItem,
  PseudoLink,
} from 'src/components';
import { ContentStore } from 'src/modules/content';
import { FilterStore } from 'src/modules/filter';
import { LayoutStore } from 'src/modules/layout';
import type { ApiSimpleDataItem } from 'types/api';
import type { FilterStoreParameterAlphabeticalIds } from 'types/filter';
import { BagStore } from '../../store';

export function BagMeta(): JSX.Element {
  const layoutCtx = LayoutStore.ctx;
  const filterCtx = FilterStore.ctx;
  const contentCtx = ContentStore.ctx;
  const bagCtx = BagStore.ctx;

  const general = {
    list: [{
      id: 'category',
      label: 'Category',
      meta: bagCtx.item.meta?.category,
    }, {
      id: 'company',
      label: 'Company',
      meta: bagCtx.item.meta?.company,
    }],
    onClick: (item) => {
      filterCtx[item.id].set(item.meta);
      contentCtx.list.reset();
      layoutCtx.bag.hide();
    },
  } as {
    list: {
      id: FilterStoreParameterAlphabeticalIds;
      label: string;
      meta: ApiSimpleDataItem;
    }[];
    onClick: (item: typeof general.list[0]) => void;
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
          ? general.list.map((prop) => (
            <ListItem key={prop.id}>
              <span>
                {`${prop.label}: `}
              </span>
              <PseudoLink
                onClick={() => {
                  general.onClick(prop);
                }}
              >
                {prop.meta?.name}
              </PseudoLink>
            </ListItem>
          ))
          : {}}
        {individual.list.length
          ? individual.list.map((prop) => (
            <ListItem key={prop.id}>
              {`${prop.label}: ${prop.meta}`}
            </ListItem>
          ))
          : {}}
      </List>
    </section>
  );
}
