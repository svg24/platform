import { useState } from 'react';
import { ContentStore } from 'src/modules/content';

export const LayoutSidebarContent = (): JSX.Element => {
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

  const data = [{
    id: 'snippets',
    heading: 'Snippets',
    items: [{
      id: 'css',
      label: 'CSS',
      content: swiper.cur?.content.snippets.css,
    }, {
      id: 'jsx',
      label: 'JSX',
      content: swiper.cur?.content.snippets.jsx,
    }, {
      id: 'svg',
      label: 'SVG',
      content: swiper.cur?.content.snippets.svg,
    }],
  }, {
    id: 'components',
    heading: 'Components',
    items: [{
      id: 'react',
      label: 'React',
      content: swiper.cur?.content.components.js.react,
    }, {
      id: 'react-ts',
      label: 'React (ts)',
      content: swiper.cur?.content.components.ts.react,
    }, {
      id: 'vue',
      label: 'Vue',
      content: swiper.cur?.content.components.js.vue,
    }],
  }, {
    id: 'packages',
    heading: 'Packages',
    items: [{
      id: 'react',
      label: 'React',
      content: swiper.cur?.content.packages.react,
    }, {
      id: 'vue',
      label: 'Vue',
      content: swiper.cur?.content.packages.vue,
    }],
  }, {
    id: 'links',
    heading: 'Links',
    items: [{
      id: 'url',
      label: 'URL',
      content: swiper.cur?.content.links.url,
    }],
  }];

  return (
    <section className="layout-sidebar__section">
      {data.map((sec) => (
        <div key={sec.id}>
          <h2 className="layout-sidebar__sub-heading">
            {sec.heading}
          </h2>
          {sec.items.map((item) => (
            <button
              className="layout-sidebar__btn"
              key={item.id}
              type="button"
              onClick={async () => {
                if (item.content) {
                  await navigator.clipboard.writeText(item.content);
                }
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      ))}
    </section>
  );
};
