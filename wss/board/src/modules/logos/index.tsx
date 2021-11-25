import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { isInViewport } from 'src/utils';
import { LogosItem } from './components/LogosItem';
import { LogosList } from './components/LogosList';
import { LogosNoFound } from './components/LogosNoFound';
import { LogosSentinel } from './components/LogosSentinel';
import { LogosStore } from './store';

export {
  LogosStore,
};

export const Logos = (): JSX.Element => {
  const { ctx } = LogosStore;

  const noFound = {
    el: observer(() => (
      ctx.list.isItems || ctx.meta.page.isNext
        ? <></>
        : <LogosNoFound />
    )),
  };

  const list = {
    mount() {
      useEffect(() => {
        const check = (): Promise<number> => (
          new Promise((resolve) => {
            let i = 1;

            const increment = (): void => {
              if (ctx.sentinel.ref?.current) {
                if (isInViewport(ctx.sentinel.ref.current)) {
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
            ctx.filter.params.multiplier = res;
          });
        });
      }, []);
    },
    obs: {
      inst: undefined as IntersectionObserver | undefined,
      create: (): Promise<void> => (
        new Promise((resolve) => {
          if (ctx.sentinel.ref?.current) {
            list.obs.inst = new IntersectionObserver(([entry]) => {
              if (entry && entry.isIntersecting && ctx.meta.page.isNext) {
                list.upload().then(() => {
                  resolve();
                });
              }
            }, { threshold: 0 });

            list.obs.inst.observe(ctx.sentinel.ref.current);
          }
        })
      ),
    },
    upload: (): Promise<void> => (
      new Promise((resolve) => {
        ctx.sentinel.show();
        ctx.list.upload().then(() => {
          ctx.sentinel.hide();
          resolve();
        });
      })
    ),
    el: observer(() => (
      ctx.list.isItems && ctx.list.items
        ? (
          <LogosList>
            {ctx.list.items.map((item) => (
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
    <>
      <list.el />
      <noFound.el />
      <LogosSentinel />
    </>
  );
};
