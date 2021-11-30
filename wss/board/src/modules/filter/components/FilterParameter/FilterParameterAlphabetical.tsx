import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/outline';
import { observer } from 'mobx-react-lite';
import { useEffect, useRef, useState } from 'react';
import { LogosStore } from 'src/modules/logos';
import type { FilterStoreParameterAlphabetical } from 'types/filter';

const FilterParameterAlphabeticalLabel = ({
  opt,
  pr,
}: {
  opt: Parameters<FilterStoreParameterAlphabetical['set']>[0];
  pr: FilterStoreParameterAlphabetical;
}): JSX.Element => {
  const { ctx } = LogosStore;

  const input = {
    el: observer(() => {
      const isCur = pr.val.checkIsCur(opt.id);

      return (
        <input
          className="filter-parameter__input"
          defaultChecked={isCur}
          name={pr.id}
          type="radio"
          onClick={(el) => {
            if (isCur && (el.target as HTMLInputElement).checked) {
              pr.reset();
            } else {
              pr.set(opt);
            }

            ctx.list.reset();
          }}
        />
      );
    }),
  };

  return (
    <label className="filter-parameter__label">
      <input.el />
      <span className="filter-parameter__name">
        {opt.name}
      </span>
    </label>
  );
};

const FilterParameterAlphabeticalItem = ({
  children,
  letter,
}: {
  children: JSX.Element[];
  letter: string;
}): JSX.Element => {
  const container = {
    ref: useRef<HTMLDivElement>(null),
    _isCollapsed: useState(true),
    get isCollapsed() {
      return container._isCollapsed[0];
    },
    set isCollapsed(val) {
      container._isCollapsed[1](val);
    },
    expand() {
      const { current } = container.ref;

      if (current) {
        current.style.height = `${current.scrollHeight}px`;
        container.isCollapsed = false;
      }
    },
    collapse() {
      requestAnimationFrame(() => {
        if (container.ref.current) {
          container.ref.current.style.height = '';
          container.isCollapsed = true;
        }
      });
    },
  };

  const btn = {
    mount() {
      useEffect(() => {
        const { current } = container.ref;

        btn.isVisible = current
          ? current.scrollHeight > current.offsetHeight
          : false;
      }, []);
    },
    _isVisible: useState(false),
    get isVisible() {
      return btn._isVisible[0];
    },
    set isVisible(val) {
      btn._isVisible[1](val);
    },
    onClick() {
      if (container.isCollapsed) {
        container.expand();
      } else {
        container.collapse();
      }
    },
  };

  btn.mount();

  return (
    <li className="filter-parameter__item">
      <span className="filter-parameter__letter">
        {letter}
      </span>
      <div
        className="filter-parameter__container"
        ref={container.ref}
      >
        {children}
      </div>
      {btn.isVisible
        ? (
          <button
            className="filter-parameter__toggle"
            type="button"
            onClick={btn.onClick}
          >
            {container.isCollapsed
              ? <ChevronDownIcon className="filter-parameter__icon" />
              : <ChevronUpIcon className="filter-parameter__icon" />}
          </button>
        )
        : <></>}
    </li>
  );
};

export const FilterParameterAlphabetical = ({
  pr,
}: {
  pr: FilterStoreParameterAlphabetical;
}): JSX.Element => (
  <fieldset className="filter-parameter">
    <legend className="filter-parameter__legend">
      {pr.legend}
    </legend>
    <ul className="filter-parameter__list">
      {pr.opts && Object.entries(pr.opts).map(([key, val]) => (
        <FilterParameterAlphabeticalItem
          key={key}
          letter={key}
        >
          {val.map((opt) => (
            <FilterParameterAlphabeticalLabel
              key={opt.id}
              opt={opt}
              pr={pr}
            />
          ))}
        </FilterParameterAlphabeticalItem>
      ))}
    </ul>
  </fieldset>
);
