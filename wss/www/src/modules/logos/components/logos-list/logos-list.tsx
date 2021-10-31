import { observer } from 'mobx-react-lite';
import React from 'react';
import store from '../../store';
import './logos-list.css';

export default () => {
  const { inst } = store;

  const list = {
    parent: React.useRef<HTMLUnknownElement>(),
    el: observer(() => (
      inst.isItems || !list.loading.el.current
        ? (
          <ol className="logos-list__list">
            {inst.items}
          </ol>
        )
        : (
          <p className="logos-list__no-found">
            No logos found for that search
          </p>
        )
    )),
    loading: {
      el: React.useRef<HTMLSpanElement>(),
      toggle() {
        list.parent.current.classList.toggle('logos-list_loading');
      },
    },
    obs: {
      inst: null,
      create: () => {
        list.obs.inst = new IntersectionObserver(([entry]) => {
          if (entry && entry.isIntersecting && inst.isMoreItems) {
            list.uploadItems();
          }
        }, { threshold: 0 });

        list.obs.inst.observe(list.parent.current.lastChild);
      },
    },
    uploadItems: () => {
      list.loading.toggle();
      inst.uploadItems().then(() => {
        list.loading.toggle();
      });
    },
    mount: () => React.useEffect(() => {
      list.obs.create();
    }, []),
  };

  list.mount();

  return (
    <output
      form="logos-search-form"
      ref={list.parent}
    >
      <list.el />
      <span
        className="logos-list__sentinel"
        ref={list.loading.el}
      >
        <svg
          className="logos-list__spin"
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
