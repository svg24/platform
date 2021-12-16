import { observer } from 'mobx-react-lite';
import { createRef, useEffect } from 'react';
import { useStore } from 'src/store';
import { isInViewport } from 'src/utils';
import { ContentItem } from './components/ContentItem';
import { ContentList } from './components/ContentList';
import { ContentNoFound } from './components/ContentNoFound';
import { ContentOutput } from './components/ContentOutput';
import { ContentSentinel } from './components/ContentSentinel';
import { ContentStore } from './store';

function Content(): JSX.Element {
  const { content, user } = useStore();

  const noFound = {
    el: observer(() => (
      content.list.response.data.isItems
      || content.list.response.meta.page.isNext
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
            user.content.list.multiplier.value.current = res;
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
                && content.list.response.meta.page.isNext
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
        content.sentinel.show();
        content.list.upload().then(() => {
          content.sentinel.hide();
          resolve();
        });
      })
    ),
    el: observer(() => (
      content.list.response.data.isItems
        ? (
          <ContentList>
            {content.list.response.data.items.map((item) => (
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
}

export { Content, ContentStore };
