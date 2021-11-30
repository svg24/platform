export const FilterParameter = ({
  children,
  legend,
}: {
  children: JSX.Element[];
  legend: string;
}): JSX.Element => (
  <fieldset className="filter-parameter filter-parameter_as-container">
    <legend className="filter-parameter__legend">
      {legend}
    </legend>
    {children}
  </fieldset>
);

export const FilterParameterLabel = ({
  children,
  name,
}: {
  children: JSX.Element;
  name: string;
}): JSX.Element => (
  <label className="filter-parameter__label">
    {children}
    <span className="filter-parameter__name">
      {name}
    </span>
  </label>
);

export const FilterParameterInput = ({
  id,
  isChecked,
  onChange,
}: {
  id: string;
  isChecked: boolean;
  onChange: () => void;
}): JSX.Element => (
  <input
    className="filter-parameter__input"
    defaultChecked={isChecked}
    name={id}
    type="radio"
    onChange={onChange}
  />
);
