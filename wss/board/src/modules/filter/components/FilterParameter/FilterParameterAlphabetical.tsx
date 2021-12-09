import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/outline';
import { useEffect, useRef, useState } from 'react';
import type { FilterStoreParameterAlphabetical } from 'types/filter';
import type { FilterParameterBaseLabelOnClick } from './FilterParameterBase';
import {
  FilterParameterBase,
  FilterParameterBaseLabel,
} from './FilterParameterBase';

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
  onClick,
  parameter,
}: {
  onClick: (
    option: Parameters<FilterStoreParameterAlphabetical['set']>[0],
    checked: Parameters<FilterParameterBaseLabelOnClick>[0],
  ) => void;
  parameter: FilterStoreParameterAlphabetical;
}): JSX.Element => (
  <FilterParameterBase legend={parameter.legend}>
    <ul className="filter-parameter__list">
      {parameter.options && Object.entries(parameter.options)
        .map(([key, value]) => (
          <FilterParameterAlphabeticalItem
            key={key}
            letter={key}
          >
            {value.map((option) => (
              <FilterParameterBaseLabel
                key={option.id}
                option={option}
                parameter={parameter}
                onClick={(checked) => {
                  onClick(option, checked);
                }}
              />
            ))}
          </FilterParameterAlphabeticalItem>
        ))}
    </ul>
  </FilterParameterBase>
);
