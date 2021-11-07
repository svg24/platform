import { ChevronDownIcon } from '@heroicons/react/outline';
import type { BaseSyntheticEvent } from 'react';
import './index.css';

export default ({
  defaultValue,
  legend,
  onChange,
  options,
}: {
  defaultValue: string;
  legend: string;
  onChange: (val: string) => void;
  options: {
    name: string;
    val: string;
  }[];
}): JSX.Element => (
  <fieldset className="select">
    <legend className="select__legend">
      {legend}
    </legend>
    <select
      className="select__select"
      value={defaultValue}
      onChange={(ev: BaseSyntheticEvent) => {
        onChange(ev.target.value);
      }}
    >
      {options.map((option) => (
        <option
          key={option.val}
          value={option.val}
        >
          {option.name}
        </option>
      ))}
    </select>
    <ChevronDownIcon className="select__icon" />
  </fieldset>
);
