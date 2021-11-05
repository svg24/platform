import { ChevronDownIcon } from '@heroicons/react/outline';
import React from 'react';
import type { BaseSyntheticEvent } from 'react';
import './select.css';

export default ({
  defaultValue,
  legend,
  onChange,
  options,
}: {
  defaultValue: string;
  legend: string;
  onChange(ev: BaseSyntheticEvent): void;
  options: {
    id: string;
    text: string;
  }[];
}): JSX.Element => (
  <fieldset className="select">
    <legend className="select__legend">
      {legend}
    </legend>
    <select
      className="select__select"
      value={defaultValue}
      onChange={onChange}
    >
      {options.map((option) => (
        <option
          key={option.id}
          value={option.id}
        >
          {option.text}
        </option>
      ))}
    </select>
    <ChevronDownIcon className="select__icon" />
  </fieldset>
);
