import { useRef, useState } from 'react';
import type { LogosDataItem } from 'src/plugins/api';
import { LayoutStore } from '../../../layout';
import { LogosStore } from '../../store';

export const LogosItem = ({ item }: { item: LogosDataItem }): JSX.Element => {
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

  const bag = {
    ref: useRef<HTMLButtonElement>(null),
    toggle() {
      layoutCtx.sidebar.initiator = bag.ref.current;

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
          ref={bag.ref}
          type="button"
          onClick={bag.toggle}
        >
          {item.name}
        </button>
      </h3>
    </li>
  );
};
