import { ClipboardIcon, DownloadIcon } from '@heroicons/react/outline';
import { useRef } from 'react';
import type { RefObject } from 'react';
import type { LogosItem } from 'src/types';
import { delay } from 'src/utils';
import './index.css';

export default ({ item }: { item: LogosItem }): JSX.Element => {
  const complete = {
    el: useRef<HTMLDivElement>(null),
    mouseleave: null as ((value: unknown) => void) | null,
    show: async (actionEl: RefObject<HTMLButtonElement>, msg: string) => {
      await Promise.race([delay(3000), new Promise((resolve) => {
        const { current } = complete.el;

        current?.setAttribute('data-msg', msg);
        current?.classList.add('logos-item_complete');

        complete.mouseleave = resolve;

        current?.addEventListener('mouseleave', complete.mouseleave);
      })]);

      complete.close(actionEl);
    },
    close: (actionEl: RefObject<HTMLButtonElement>) => {
      const { current } = complete.el;

      actionEl.current?.blur();
      current?.classList.remove('logos-item_complete');
      current?.removeAttribute('data-msg');

      if (complete.mouseleave) {
        current?.removeEventListener('mouseleave', complete.mouseleave);
      }
    },
  };

  const content = {
    container: useRef<HTMLDivElement>(null),
    get html() {
      return content.container.current?.firstElementChild?.outerHTML;
    },
    copy: async (actionEl: RefObject<HTMLButtonElement>) => {
      try {
        if (!content.html) return;

        await navigator.clipboard.writeText(content.html);
        complete.show(actionEl, 'Copied');
      } catch (err) {
        complete.show(actionEl, 'Copy error');
      }
    },
    download: (actionEl: RefObject<HTMLButtonElement>) => {
      try {
        if (!content.html) return;

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
      el: useRef<HTMLButtonElement>(null),
      handler: content.download,
      icon: DownloadIcon,
      label: `Download ${item.name} logo`,
    }, {
      id: 'copy',
      el: useRef<HTMLButtonElement>(null),
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
        onClick={() => { action.handler(action.el); }}
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
        dangerouslySetInnerHTML={{ __html: item.content[0] || '' }}
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
