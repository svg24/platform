import { observer } from 'mobx-react-lite';
import { useEffect, useRef } from 'react';
import LogosStore from '../../store';
import LogosItem from '../logos-item';
import './index.css';

export default (): JSX.Element => {
  const { ctx } = LogosStore;

  const filter = {
    ref: useRef<HTMLOutputElement>(null),
  };

  const list = {
    el: observer(() => {
      if (ctx.list.isItems || !list.loading.ref.current) {
        const block = 'logos-output__list';
        const mod = `logos-output__list_${ctx.filter.params.size.val.cur}`;

        return (
          <ol className={`${block} ${mod}`}>
            {ctx.list.items?.map((item) => (
              <LogosItem
                item={item}
                key={item.slug}
              />
            ))}
          </ol>
        );
      }

      return (
        <p className="logos-output__no-found">
          No logos found for that search
        </p>
      );
    }),
    loading: {
      ref: useRef<HTMLSpanElement>(null),
      toggle() {
        filter.ref.current?.classList.toggle('logos-output_loading');
      },
    },
    obs: {
      inst: undefined as IntersectionObserver | undefined,
      create: () => {
        list.obs.inst = new IntersectionObserver(([entry]) => {
          if (entry && entry.isIntersecting && ctx.list.isMore) list.process();
        }, { threshold: 0 });

        const last = filter.ref.current?.lastElementChild;

        if (last) list.obs.inst.observe(last);
      },
    },
    process: () => {
      list.loading.toggle();
      ctx.list.upload().then(() => {
        list.loading.toggle();
      });
    },
    mount: () => {
      useEffect(() => {
        list.obs.create();
      }, []);
    },
  };

  list.mount();

  return (
    <output
      form="logos-filter"
      ref={filter.ref}
    >
      <list.el />
      <span
        className="logos-output__sentinel"
        ref={list.loading.ref}
      >
        <svg
          className="logos-output__spin"
          fill="none"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            fill="currentColor"
          />
        </svg>
        <span>
          Loading more...
        </span>
      </span>
    </output>
  );
};
