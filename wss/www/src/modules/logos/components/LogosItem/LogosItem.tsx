import { useState } from 'react';
import { LayoutStore } from '../../../layout';
import { LogosStore } from '../../store';
import type { LogosItem as Item } from '../../types';

export const LogosItem = ({ item }: { item: Item }): JSX.Element => {
  const layoutCtx = LayoutStore.ctx;
  const logosCtx = LogosStore.ctx;

  const content = {
    _html: useState<string>(item.content[0] || ''),
    get html() {
      return content._html[0];
    },
    set html(val) {
      content._html[1](val);
    },
  };

  const bag = {
    toggle() {
      logosCtx.bag.add(item);
      layoutCtx.root.sidebar.show();
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
          type="button"
          onClick={bag.toggle}
        >
          {item.name}
        </button>
      </h3>
    </li>
  );
};
