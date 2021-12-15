import {
  Link,
  List,
  ListItem,
  PseudoLink,
} from 'src/components';
import { useStore } from 'src/store';
import type { ApiSimpleDataItem } from 'types/api';
import type { FilterStoreParameterAlphabeticalIds } from 'types/filter';

export function BagMeta(): JSX.Element {
  const {
    bag,
    content,
    filter,
    layout,
  } = useStore();

  const general = {
    list: [{
      id: 'category',
      label: 'Category',
      meta: bag.item.meta?.category,
    }, {
      id: 'company',
      label: 'Company',
      meta: bag.item.meta?.company,
    }],
    onClick: (item) => {
      filter[item.id].set(item.meta);
      content.list.reset();
      layout.bag.hide();
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
    list: bag.item.data
      ? [{
        id: 'version',
        label: 'Version',
        meta: new Date(bag.item.data?.version).toLocaleString('en', {
          year: 'numeric',
        }),
      }]
      : [],
  };

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
