import { ShoppingBagIcon } from '@heroicons/react/outline';
import { observer } from 'mobx-react-lite';
import { useEffect, useRef } from 'react';
import { LayoutStore } from '../../store';
import { LayoutNav } from '../LayoutNav';

const LayoutMainContainer = (
  { children }: { children: JSX.Element },
): JSX.Element => {
  const container = {
    ref: useRef<HTMLDivElement>(null),
    get classList() {
      return container.ref.current?.classList;
    },
    scrollDown: {
      add() {
        container.classList?.add('layout-main__container_scroll-down');
      },
      remove() {
        container.classList?.remove('layout-main__container_scroll-down');
      },
    },
    scrollUp: {
      add() {
        container.classList?.add('layout-main__container_scroll-up');
      },
      remove() {
        container.classList?.remove('layout-main__container_scroll-up');
      },
    },
  };

  const content = {
    ref: useRef<HTMLDivElement>(null),
    mount() {
      useEffect(() => {
        content.scroll.add();
        content.mutation.observe();
      }, []);
    },
    scroll: {
      add() {
        content.ref.current
          ?.addEventListener('scroll', content.scroll.listener);
      },
      listener() {
        if (content.ref.current) {
          const {
            clientHeight,
            offsetHeight,
            scrollHeight,
            scrollTop,
          } = content.ref.current;

          if (clientHeight === scrollHeight) {
            container.scrollDown.remove();
            container.scrollUp.remove();
            return;
          }

          if (scrollTop + offsetHeight === scrollHeight) {
            container.scrollDown.remove();
          } else {
            container.scrollDown.add();
          }

          if (scrollTop > 0) {
            container.scrollUp.add();
          } else {
            container.scrollUp.remove();
          }
        }
      },
    },
    mutation: {
      observe() {
        if (content.ref.current) {
          content.mutation.obs.observe(content.ref.current, {
            childList: true,
          });
        }
      },
      obs: new MutationObserver(() => {
        content.scroll.listener();
      }),
    },
  };

  content.mount();

  return (
    <div
      className="layout-main__container"
      ref={container.ref}
    >
      <div
        className="layout-main__content"
        ref={content.ref}
      >
        {children}
      </div>
    </div>
  );
};

export const LayoutMain = (
  { children }: { children: JSX.Element },
): JSX.Element => {
  const { ctx } = LayoutStore;

  const nav = {
    el: observer(() => (
      ctx.nav.isVisible
        ? <LayoutNav companies={nav.companies} />
        : <></>
    )),
    companies: ['Adobe', 'Alphabet', 'Github'],
  };

  const bag = {
    icon: ShoppingBagIcon,
    onClick: () => {},
  };

  return (
    <main
      className="layout-main"
    >
      <nav.el />
      <LayoutMainContainer>
        {children}
      </LayoutMainContainer>
      <div className="layout-main__actions">
        <button
          className="layout-main__btn"
          type="button"
          onClick={bag.onClick}
        >
          <bag.icon className="layout-main__icon" />
        </button>
      </div>
    </main>
  );
};
