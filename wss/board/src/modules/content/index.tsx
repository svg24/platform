import { observer } from 'mobx-react-lite';
import { createRef, useEffect } from 'react';
import { UserStore } from 'src/modules/user';
import { isInViewport } from 'src/utils';
import { ContentItem } from './components/ContentItem';
import { ContentList } from './components/ContentList';
import { ContentNoFound } from './components/ContentNoFound';
import { ContentOutput } from './components/ContentOutput';
import { ContentSentinel } from './components/ContentSentinel';
import { ContentStore } from './store';

export { ContentStore };

export const Content = (): JSX.Element => {
  const contentCtx = ContentStore.ctx;
  const userCtx = UserStore.ctx;

  const noFound = {
    el: observer(() => (
      contentCtx.list.data.isItems || contentCtx.list.meta.page.isNext
        ? <></>
        : <ContentNoFound />
    )),
  };

  const sentinel = {
    ref: createRef<HTMLDivElement>(),
  };

  const list = {
    mount() {
      useEffect(() => {
        const check = (): Promise<number> => (
          new Promise((resolve) => {
            let i = 1;

            const increment = (): void => {
              if (sentinel.ref?.current) {
                if (isInViewport(sentinel.ref.current)) {
                  i += 1;

                  list.upload().then(() => {
                    increment();
                  });
                } else {
                  resolve(i);
                }
              }
            };

            increment();
          })
        );

        list.obs.create().then(() => {
          check().then((res) => {
            userCtx.multiplier = res;
          });
        });
      }, []);
    },
    obs: {
      inst: undefined as IntersectionObserver | undefined,
      create: (): Promise<void> => (
        new Promise((resolve) => {
          if (sentinel.ref?.current) {
            list.obs.inst = new IntersectionObserver(([entry]) => {
              if (
                entry
                && entry.isIntersecting
                && contentCtx.list.meta.page.isNext
              ) {
                list.upload().then(() => {
                  resolve();
                });
              }
            }, { threshold: 0 });

            list.obs.inst.observe(sentinel.ref.current);
          }
        })
      ),
    },
    upload: (): Promise<void> => (
      new Promise((resolve) => {
        contentCtx.sentinel.show();
        contentCtx.list.upload().then(() => {
          contentCtx.sentinel.hide();
          resolve();
        });
      })
    ),
    el: observer(() => (
      contentCtx.list.data.isItems
        ? (
          <ContentList>
            {contentCtx.list.data.items.map((item) => (
              <ContentItem
                item={item}
                key={item.id}
              />
            ))}
          </ContentList>
        )
        : <></>
    )),
  };

  list.mount();

  return (
    <ContentOutput>
      <list.el />
      <noFound.el />
      <ContentSentinel ref={sentinel.ref} />
    </ContentOutput>
  );
};
