import { useEffect, useRef } from 'react';
import { LayoutStore } from '../../store';

export function LayoutMainContainer({
  children,
}: {
  children: JSX.Element;
}): JSX.Element {
  const { ctx } = LayoutStore;

  const root = {
    ref: useRef<HTMLDivElement>(null),
    get ls() {
      return root.ref.current?.classList;
    },
    addScrollDown() {
      root.ls?.add('layout-main__container_scroll-down');
    },
    rmScrollDown() {
      root.ls?.remove('layout-main__container_scroll-down');
    },
    addScrollUp() {
      root.ls?.add('layout-main__container_scroll-up');
    },
    rmScrollUp() {
      root.ls?.remove('layout-main__container_scroll-up');
    },
  };

  const content = {
    ref: useRef<HTMLDivElement>(null),
    mount() {
      ctx.main.content.toTop = () => {
        if (content.ref.current) content.ref.current.scrollTop = 0;
      };

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
            root.rmScrollDown();
            root.rmScrollUp();
            return;
          }

          if (scrollTop + offsetHeight === scrollHeight) {
            root.rmScrollDown();
          } else {
            root.addScrollDown();
          }

          if (scrollTop > 0) {
            root.addScrollUp();
          } else {
            root.rmScrollUp();
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
      ref={root.ref}
    >
      <div
        className="layout-main__content"
        ref={content.ref}
      >
        {children}
      </div>
    </div>
  );
}
