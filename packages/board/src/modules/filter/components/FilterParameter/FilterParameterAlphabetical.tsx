import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/outline';
import { useEffect, useRef, useState } from 'react';
import {
  FormContainer,
  FormLabelComplete,
  FormParameter,
} from 'src/components';
import type {
  ParameterAlphabeticalOnClick,
  ParameterAlphabeticalParameter,
} from 'types/filter';

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
    get setIsCollapsed() {
      return container._isCollapsed[1];
    },
    expand() {
      const { current } = container.ref;

      if (current) {
        current.style.height = `${current.scrollHeight}px`;
        container.setIsCollapsed(false);
      }
    },
    collapse() {
      requestAnimationFrame(() => {
        if (container.ref.current) {
          container.ref.current.style.height = '';
          container.setIsCollapsed(true);
        }
      });
    },
  };

  const btn = {
    _isVisible: useState(false),
    get isVisible() {
      return btn._isVisible[0];
    },
    get setIsVisible() {
      return btn._isVisible[1];
    },
    onClick() {
      if (container.isCollapsed) {
        container.expand();
      } else {
        container.collapse();
      }
    },
  };

  useEffect(() => {
    const { current } = container.ref;

    btn.setIsVisible(current
      ? current.scrollHeight > current.offsetHeight
      : false);
  }, []);

  return (
    <li className="filter-parameter__item">
      <span className="filter-parameter__letter">
        {letter}
      </span>
      <FormContainer ref={container.ref}>
        {children}
      </FormContainer>
      {btn.isVisible
        ? (
          <button
            className="filter-parameter__toggle"
            type="button"
            onClick={btn.onClick}
          >
            {(container.isCollapsed
              ? ChevronDownIcon
              : ChevronUpIcon)({ className: 'filter-parameter__icon' })}
          </button>
        )
        : <></>}
    </li>
  );
};

export function FilterParameterAlphabetical({
  onClick,
  parameter,
}: {
  onClick: ParameterAlphabeticalOnClick;
  parameter: ParameterAlphabeticalParameter;
}): JSX.Element {
  return (
    <FormParameter
      className="filter-parameter"
      legend={parameter.legend}
    >
      <ul className="filter-parameter__list">
        {parameter.options && Object.entries(parameter.options)
          .map(([key, value]) => (
            <FilterParameterAlphabeticalItem
              key={key}
              letter={key}
            >
              {value.map((option) => (
                <FormLabelComplete
                  key={option.id}
                  option={option}
                  parameter={parameter}
                  onClick={(isChecked) => {
                    onClick(option, isChecked);
                  }}
                />
              ))}
            </FilterParameterAlphabeticalItem>
          ))}
      </ul>
    </FormParameter>
  );
}