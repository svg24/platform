import { XIcon } from '@heroicons/react/outline';

export const FilterApplied = ({
  children,
  legend,
}: {
  children?: JSX.Element | JSX.Element[];
  legend: string;
}): JSX.Element => (
  <fieldset className="filter-applied">
    <legend className="filter-applied__legend">
      {legend}
    </legend>
    {children}
  </fieldset>
);

FilterApplied.defaultProps = {
  children: undefined,
};

export const FilterAppliedLabel = ({
  children,
  name,
}: {
  children: JSX.Element;
  name: string;
}): JSX.Element => (
  <label className="filter-applied__label">
    {children}
    <span className="filter-applied__name">
      {name}
    </span>
    <XIcon className="filter-applies__icon" />
  </label>
);

export const FilterAppliedInput = ({
  onChange,
}: {
  onChange: () => void;
}): JSX.Element => (
  <input
    className="filter-applied__input"
    type="checkbox"
    checked
    onChange={onChange}
  />
);
