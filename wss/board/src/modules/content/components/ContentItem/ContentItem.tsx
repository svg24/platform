import { DotsVerticalIcon } from '@heroicons/react/outline';
import { useRef, useState } from 'react';
import { useStore } from 'src/store';
import type { ApiListDataItem } from 'types/api';

export function ContentItem({ item }: { item: ApiListDataItem }): JSX.Element {
  const { bag, content, layout } = useStore();

  const html = {
    _vanilla: useState(item.latest || ''),
    get vanilla() {
      return html._vanilla[0];
    },
    set vanilla(val) {
      html._vanilla[1](val);
    },
  };

  const btn = {
    ref: useRef<HTMLButtonElement>(null),
    async toggle() {
      layout.bag.goBack = () => {
        btn.ref.current?.focus();
        bag.list.clear();
        content.item.clear();
      };
      bag.list.add(item.id);
      await content.item.fetch();

      if (content.item.result && content.item.result.data[0]) {
        bag.item.setData(content.item.result.data[0]);
        bag.item.setMeta(content.item.result.meta);
        layout.bag.show();
      }
    },
  };

  return (
    <li className="content-item">
      <div className="content-item__container">
        <div
          className="content-item__vanilla"
          dangerouslySetInnerHTML={{ __html: html.vanilla }}
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
}
