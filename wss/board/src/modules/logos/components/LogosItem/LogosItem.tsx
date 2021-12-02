import { useRef, useState } from 'react';
import { LayoutStore } from 'src/modules/layout';
import type { ApiLogosDataItem } from 'types/api';
import { LogosStore } from '../../store';

export const LogosItem = ({ item }: { item: ApiLogosDataItem }): JSX.Element => {
  const layoutCtx = LayoutStore.ctx;
  const logosCtx = LogosStore.ctx;

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

      logosCtx.bag.add(item);
      layoutCtx.sidebar.show();
    },
  };

  return (
    <li className="logos-item">
      <div
        className="logos-item__container"
        dangerouslySetInnerHTML={{ __html: content.html }}
      />
      <h3 className="logos-item__heading">
        <button
          className="logos-item__btn"
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
