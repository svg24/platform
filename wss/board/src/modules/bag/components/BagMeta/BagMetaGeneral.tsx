import { ListItem, PseudoLink } from 'src/components';
import { useStore } from 'src/store';
import type { MetaGeneralItem } from 'types/bag';

export function BagMetaGeneral(): JSX.Element {
  const {
    bag,
    content,
    filter,
    layout,
  } = useStore();

  const category: MetaGeneralItem = {
    id: 'category',
    label: 'Category',
    meta: bag.item.meta?.category,
  };
  const company: MetaGeneralItem = {
    id: 'company',
    label: 'Company',
    meta: bag.item.meta?.company,
  };

  function handleOnClick(item: MetaGeneralItem): void {
    if (item.meta) {
      filter[item.id].set(item.meta);
      content.list.reset();
      layout.bag.hide();
    }
  }

  return (
    <>
      {[category, company].map((prop) => (
        <ListItem key={prop.id}>
          <span>
            {`${prop.label}: `}
          </span>
          <PseudoLink
            onClick={() => {
              handleOnClick(prop);
            }}
          >
            {prop.meta?.name}
          </PseudoLink>
        </ListItem>
      ))}
    </>
  );
}
