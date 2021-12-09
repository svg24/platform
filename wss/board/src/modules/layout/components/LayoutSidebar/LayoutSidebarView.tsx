import { useState } from 'react';
import { ContentStore } from 'src/modules/content';

export const LayoutSidebarView = (): JSX.Element => {
  const contentCtx = ContentStore.ctx;

  const swiper = {
    _cur: useState(contentCtx.item.data ? contentCtx.item.data[0] : null),
    get cur() {
      return swiper._cur[0];
    },
    get html() {
      return swiper.cur?.content.snippets.svg || '';
    },
  };

  return (
    <section className="layout-sidebar__section">
      <div
        className="layout-sidebar__container"
        dangerouslySetInnerHTML={{ __html: swiper.html }}
      />
      <ul>
        <li>
          123
        </li>
      </ul>
    </section>
  );
};
