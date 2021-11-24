import { ExternalLinkIcon } from '@heroicons/react/outline';
import { useEffect, useRef } from 'react';
import { LogosStore } from 'src/modules/logos';
import { LayoutStore } from '../../store';

export const LayoutSidebar = (): JSX.Element => {
  const layoutCtx = LayoutStore.ctx;
  const logosCtx = LogosStore.ctx;
  const item = logosCtx.bag.items?.[0];

  if (!item) return <></>;

  const root = {
    ref: useRef<HTMLDivElement>(null),
    mount() {
      useEffect(() => {
        if (root.ref.current) {
          root.ref.current.focus();
          root.ref.current.addEventListener('click', root.click);
          root.ref.current.addEventListener('focusout', root.focusout);
        }
      }, []);
    },
    click(ev: MouseEvent) {
      if (ev.target === root.ref.current) root.close();
    },
    focusout: (ev: FocusEvent) => {
      if (!root.ref.current?.contains(ev.relatedTarget as Node)) {
        root.close();
      }
    },
    close() {
      layoutCtx.root.sidebar.hide();
      layoutCtx.sidebar.initiator?.focus();
    },
  };

  root.mount();

  const download = {
    onClick: () => {
      const blob = new Blob([item.content[0] || '']);
      const link = document.createElement('a');

      Object.assign(link, {
        href: window.URL.createObjectURL(blob),
        download: `${item.id}.svg`,
      });

      link.click();
      link.remove();
    },
  };

  const copy = {
    onClick: async () => {
      await navigator.clipboard.writeText(item.content[0] || '');
    },
  };

  return (
    <div
      aria-label={`${item.name} details`}
      className="layout-sidebar"
      ref={root.ref}
      role="dialog"
      tabIndex={-1}
    >
      <div className="layout-sidebar__inner">
        <div
          className="layout-sidebar__container"
          dangerouslySetInnerHTML={{ __html: item.content[0] || '' }}
        />
        <h1 className="layout-sidebar__heading">
          <span id="layout-sidebar-heading">
            {item.name}
          </span>
          <a
            aria-label={`Go to ${item.name} website`}
            className="layout-sidebar__src"
            href={item.src}
          >
            <ExternalLinkIcon
              aria-hidden="true"
              className="layout-sidebar__icon"
            />
          </a>
        </h1>
        <section className="layout-sidebar__section">
          <h2 className="layout-sidebar__section-heading">
            Download
          </h2>
          <button
            className="layout-sidebar__section-btn"
            type="button"
            onClick={download.onClick}
          >
            .svg
          </button>
        </section>
        <section className="layout-sidebar__section">
          <h2 className="layout-sidebar__section-heading">
            Copy
          </h2>
          <button
            className="layout-sidebar__section-btn"
            type="button"
            onClick={copy.onClick}
          >
            html
          </button>
        </section>
      </div>
    </div>
  );
};
