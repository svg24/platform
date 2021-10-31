import { ClipboardIcon, DownloadIcon } from '@heroicons/react/outline';
import { LogosItem } from '@svg24/www/src/types/logos';
import { delay } from '@svg24/www/src/utils';
import React, { MutableRefObject, useRef } from 'react';
import './logos-item.css';

export default ({ item }: { item: LogosItem }) => {
  const complete = {
    el: useRef<HTMLDivElement>(),
    mouseleave: null,
    show: async (actionEl: MutableRefObject<HTMLButtonElement>, msg: string) => {
      await Promise.race([delay(3000), new Promise((resolve) => {
        const { current } = complete.el;

        current.setAttribute('data-msg', msg);
        current.classList.add('logos-item_complete');

        complete.mouseleave = resolve;

        current.addEventListener('mouseleave', complete.mouseleave);
      })]);

      complete.close(actionEl);
    },
    close: (actionEl: MutableRefObject<HTMLButtonElement>) => {
      const { current } = complete.el;

      actionEl.current.blur();
      current.classList.remove('logos-item_complete');
      current.removeAttribute('data-msg');
      current.removeEventListener('mouseleave', complete.mouseleave);
    },
  };

  const content = {
    container: useRef<HTMLDivElement>(),
    get html() {
      return content.container.current.firstElementChild.outerHTML;
    },
    copy: async (actionEl: MutableRefObject<HTMLButtonElement>) => {
      try {
        await navigator.clipboard.writeText(content.html);
        complete.show(actionEl, 'Copied');
      } catch (err) {
        complete.show(actionEl, 'Copy error');
      }
    },
    download: (actionEl: MutableRefObject<HTMLButtonElement>) => {
      try {
        const blob = new Blob([content.html]);
        const link = document.createElement('a');

        Object.assign(link, {
          href: window.URL.createObjectURL(blob),
          download: `${item.slug}.svg`,
        });

        link.click();
        link.remove();
        complete.show(actionEl, 'Downloaded');
      } catch (err) {
        complete.show(actionEl, 'Download error');
      }
    },
  };

  const actions = {
    els: [{
      id: 'download',
      el: useRef<HTMLButtonElement>(),
      handler: content.download,
      icon: DownloadIcon,
      label: `Download ${item.name} logo`,
    }, {
      id: 'copy',
      el: useRef<HTMLButtonElement>(),
      handler: content.copy,
      icon: ClipboardIcon,
      label: `Copy ${item.name} logo`,
    }].map((action) => (
      <button
        aria-label={action.label}
        className="logos-item__actions-item"
        key={action.id}
        ref={action.el}
        type="button"
        onClick={() => action.handler(action.el)}
      >
        <action.icon
          aria-hidden="true"
          className="logos-item__actions-icon"
        />
      </button>
    )),
  };

  return (
    <div
      className="logos-item"
      ref={complete.el}
    >
      <div
        className="logos-item__container"
        dangerouslySetInnerHTML={{ __html: item.content[0] }}
        ref={content.container}
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
      <div className="logos-item__actions-container">
        {actions.els}
      </div>
    </div>
  );
};
