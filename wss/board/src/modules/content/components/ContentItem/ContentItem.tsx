import { DotsVerticalIcon } from '@heroicons/react/outline';
import { useRef, useState } from 'react';
import { BagStore } from 'src/modules/bag';
import { LayoutStore } from 'src/modules/layout';
import type { ApiListDataItem } from 'types/api';
import { ContentStore } from '../../store';

export const ContentItem = ({
  item,
}: {
  item: ApiListDataItem;
}): JSX.Element => {
  const layoutCtx = LayoutStore.ctx;
  const contentCtx = ContentStore.ctx;
  const bagCtx = BagStore.ctx;

  const content = {
    _vanilla: useState(item.latest || ''),
    get vanilla() {
      return content._vanilla[0];
    },
    set vanilla(val) {
      content._vanilla[1](val);
    },
  };

  const btn = {
    ref: useRef<HTMLButtonElement>(null),
    async toggle() {
      layoutCtx.bag.back = () => {
        btn.ref.current?.focus();
        bagCtx.list.clear();
        contentCtx.item.clear();
      };
      bagCtx.list.add(item.id);
      await contentCtx.item.fetch();

      if (contentCtx.item.result) {
        bagCtx.item.setData(contentCtx.item.result.data[0]);
        bagCtx.item.setMeta(contentCtx.item.result.meta);
        layoutCtx.bag.show();
      }
    },
  };

  return (
    <li className="content-item">
      <div className="content-item__container">
        <div
          className="content-item__vanilla"
          dangerouslySetInnerHTML={{ __html: content.vanilla }}
        />
        {item.isMany
          ? <DotsVerticalIcon className="content-item__icon" />
          : <></>}
      </div>
      <h3 className="content-item__heading">
        <button
          className="content-item__btn"
          ref={btn.ref}
          type="button"
          onClick={btn.toggle}
        >
          {item.name}
        </button>
      </h3>
    </li>
  );
};
