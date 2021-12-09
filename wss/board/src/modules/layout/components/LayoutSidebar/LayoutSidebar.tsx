import { ExternalLinkIcon } from '@heroicons/react/outline';
import { useEffect, useRef } from 'react';
import { ContentStore } from 'src/modules/content';
import { LayoutStore } from '../../store';
import { LayoutSidebarActions } from './LayoutSidebarActions';
import { LayoutSidebarContent } from './LayoutSidebarContent';
import { LayoutSidebarMeta } from './LayoutSidebarMeta';
import { LayoutSidebarView } from './LayoutSidebarView';

export const LayoutSidebar = (): JSX.Element => {
  const layoutCtx = LayoutStore.ctx;
  const contentCtx = ContentStore.ctx;

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
      if (!ev.relatedTarget) return;
      if (!root.ref.current?.contains(ev.relatedTarget as Node)) root.close();
    },
    close() {
      layoutCtx.sidebar.hide();
      layoutCtx.sidebar.back();
    },
  };

  root.mount();

  return contentCtx.item.data && contentCtx.item.meta
    ? (
      <div
        aria-label={`${contentCtx.item.meta?.name} details`}
        className="layout-sidebar"
        ref={root.ref}
        role="dialog"
        tabIndex={-1}
      >
        <div className="layout-sidebar__inner">
          <h1 className="layout-sidebar__heading">
            <span id="layout-sidebar-heading">
              {contentCtx.item.meta?.name}
            </span>
            <a
              aria-label={`Go to ${contentCtx.item.meta?.name} website`}
              className="layout-sidebar__src"
              href={contentCtx.item.meta?.src.product}
            >
              <ExternalLinkIcon
                aria-hidden="true"
                className="layout-sidebar__icon"
              />
            </a>
          </h1>
          <LayoutSidebarView />
          <LayoutSidebarMeta />
          <LayoutSidebarActions />
          <LayoutSidebarContent />
        </div>
      </div>
    )
    : <></>;
};
