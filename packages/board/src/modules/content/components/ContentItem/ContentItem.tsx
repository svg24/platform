import { DotsVerticalIcon } from '@heroicons/react/outline';
import { useRef } from 'react';
import { useStore } from 'src/store';
import type { StoreListResponseDataItemsItem } from 'types/content';

export function ContentItem({
  item,
}: {
  item: StoreListResponseDataItemsItem;
}): JSX.Element {
  const { bag, content, layout } = useStore();
  const ref = useRef<HTMLButtonElement>(null);

  async function handleToggle(): Promise<void> {
    layout.bag.goBack = () => {
      ref.current?.focus();
      bag.list.clear();
      content.item.clear();
    };
    bag.list.add(item.id);
    await content.item.fetch();

    if (content.item.response && content.item.response.data[0]) {
      bag.item.setData(content.item.response.data[0]);
      bag.item.setMeta(content.item.response.meta);
      layout.bag.show();
    }
  }

  return (
    <li className="content-item">
      <div className="content-item__container">
        <div
          className="content-item__vanilla"
          dangerouslySetInnerHTML={{ __html: item.latest || '' }}
        />
        {item.hasMore
          ? <DotsVerticalIcon className="content-item__icon" />
          : null}
      </div>
      <h3 className="content-item__heading">
        <button
          className="content-item__btn"
          ref={ref}
          type="button"
          onClick={handleToggle}
        >
          {item.name}
        </button>
      </h3>
    </li>
  );
}
