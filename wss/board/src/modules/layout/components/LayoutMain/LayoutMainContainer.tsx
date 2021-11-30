import { useEffect, useRef } from 'react';
import { LayoutStore } from '../../store';

export const LayoutMainContainer = (
  { children }: { children: JSX.Element },
): JSX.Element => {
  const { ctx } = LayoutStore;

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

  ctx.main.content.ref = useRef<HTMLDivElement>(null);

  const content = {
    get cur() {
      return ctx.main.content.ref?.current;
    },
    mount() {
      useEffect(() => {
        content.scroll.add();
        content.mutation.observe();
      }, []);
    },
    scroll: {
      add() {
        content.cur?.addEventListener('scroll', content.scroll.listener);
      },
      listener() {
        if (content.cur) {
          const {
            clientHeight,
            offsetHeight,
            scrollHeight,
            scrollTop,
          } = content.cur;

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
        if (content.cur) {
          content.mutation.obs.observe(content.cur, {
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
        ref={ctx.main.content.ref}
      >
        {children}
      </div>
    </div>
  );
};
