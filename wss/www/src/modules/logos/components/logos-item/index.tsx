import { useState } from 'react';
import type { LogosItem } from 'src/types';
import LogosItemActions from '../logos-item-actions';
import './index.css';

export default ({ item }: { item: LogosItem }): JSX.Element => {
  const content = {
    _index: useState(0),
    get index() {
      return content._index[0];
    },
    set index(val) {
      content._index[1](val);
    },
    _html: useState<string>(item.content[0] || ''),
    get html() {
      return content._html[0];
    },
    set html(val) {
      content._html[1](val);
    },
    get isMany() {
      return item.content.length > 1;
    },
    next() {
      content.update(content.index + 1);
    },
    prev() {
      content.update(content.index - 1);
    },
    update(val: number) {
      const max = item.content.length - 1;

      if (content.index === max) {
        const first = 0;
        content.index = first;
        content.html = item.content[first] || '';

        return;
      }

      if (content.index < max) {
        content.index = max;
        content.html = item.content[max] || '';

        return;
      }

      content.index = val;
      content.html = item.content[val] || '';
    },
  };

  return (
    <li className={`logos-item ${content.isMany ? 'logos-item_many' : ''}`}>
      <div className="logos-item__inner">
        <div
          className="logos-item__container"
          dangerouslySetInnerHTML={{ __html: content.html }}
        />
        <div className="logos-item__meta">
          <h3 className="logos-item__heading">
            <a
              className="logos-item__src"
              href={item.src}
            >
              {item.name}
            </a>
          </h3>
          <span className="logos-item__category">
            {item.category}
          </span>
        </div>
        <LogosItemActions
          content={content}
          name={item.name}
          slug={item.slug}
        />
      </div>
    </li>
  );
};
