import { observer } from 'mobx-react-lite';
import { createRef, useEffect } from 'react';
import { UserStore } from 'src/modules/usr';
import { isInViewport } from 'src/utils';
import { LogosItem } from './components/LogosItem';
import { LogosList } from './components/LogosList';
import { LogosNoFound } from './components/LogosNoFound';
import { LogosOutput } from './components/LogosOutput';
import { LogosSentinel } from './components/LogosSentinel';
import { LogosStore } from './store';

export { LogosStore };

export const Logos = (): JSX.Element => {
  const logosCtx = LogosStore.ctx;
  const usrCtx = UserStore.ctx;

  const noFound = {
    el: observer(() => (
      logosCtx.list.isItems || logosCtx.meta.page.isNext
        ? <></>
        : <LogosNoFound />
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
            usrCtx.multiplier = res;
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
              if (entry && entry.isIntersecting && logosCtx.meta.page.isNext) {
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
        logosCtx.sentinel.show();
        logosCtx.list.upload().then(() => {
          logosCtx.sentinel.hide();
          resolve();
        });
      })
    ),
    el: observer(() => (
      logosCtx.list.isItems && logosCtx.list.items
        ? (
          <LogosList>
            {logosCtx.list.items.map((item) => (
              <LogosItem
                item={item}
                key={item.id}
              />
            ))}
          </LogosList>
        )
        : <></>
    )),
  };

  list.mount();

  return (
    <LogosOutput>
      <list.el />
      <noFound.el />
      <LogosSentinel ref={sentinel.ref} />
    </LogosOutput>
  );
};
