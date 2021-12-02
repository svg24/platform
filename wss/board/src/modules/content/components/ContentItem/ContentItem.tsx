import { useRef, useState } from 'react';
import { LayoutStore } from 'src/modules/layout';
import type { ApiLogosDataItem } from 'types/api';
import { ContentStore } from '../../store';

export const ContentItem = ({
  item,
}: {
  item: ApiLogosDataItem;
}): JSX.Element => {
  const layoutCtx = LayoutStore.ctx;
  const contentCtx = ContentStore.ctx;

  const content = {
    _html: useState<string>(item.content[0]?.snippets.vanilla || ''),
    get html() {
      return content._html[0];
    },
    set html(val) {
      content._html[1](val);
    },
  };

  const btn = {
    ref: useRef<HTMLButtonElement>(null),
    toggle() {
      layoutCtx.sidebar.initiator = btn.ref.current;

      contentCtx.bag.add(item);
      layoutCtx.sidebar.show();
    },
  };

  return (
    <li className="content-item">
      <div
        className="content-item__container"
        dangerouslySetInnerHTML={{ __html: content.html }}
      />
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
