import { observer } from 'mobx-react-lite';
import { useRef } from 'react';
import type {
  FilterStoreParameter,
  FilterStoreParameterAlphabetical,
} from 'types/filter';

type Parameter = FilterStoreParameter | FilterStoreParameterAlphabetical;

export const FilterParameterBase = ({
  children,
  legend,
}: {
  children: JSX.Element;
  legend: Parameter['legend'];
}): JSX.Element => (
  <fieldset className="filter-parameter">
    <legend className="filter-parameter__legend">
      {legend}
    </legend>
    <div className="filter-parameter__container">
      {children}
    </div>
  </fieldset>
);

export type FilterParameterBaseLabelOnClick = (checked: boolean) => void;

export const FilterParameterBaseLabel = ({
  onChange,
  onClick,
  option,
  parameter,
}: {
  onChange?: () => void;
  onClick?: FilterParameterBaseLabelOnClick;
  option: Parameters<Parameter['set']>[0];
  parameter: Parameter;
}): JSX.Element => {
  const input = {
    ref: useRef<HTMLInputElement>(null),
    el: observer(() => {
      const isCur = parameter.value.checkCurrent(option.id);

      if (input.ref.current) {
        input.ref.current.checked = isCur;
      }

      return (
        <input
          className="filter-parameter__input"
          defaultChecked={isCur}
          name={parameter.id}
          ref={input.ref}
          type="radio"
          onChange={onChange || undefined}
          onClick={onClick
            ? (el) => {
              onClick(isCur && (el.target as HTMLInputElement).checked);
            }
            : undefined}
        />
      );
    }),
  };

  return (
    <label className="filter-parameter__label">
      <input.el />
      <span className="filter-parameter__name">
        {option.name}
      </span>
    </label>
  );
};

FilterParameterBaseLabel.defaultProps = {
  onChange: undefined,
  onClick: undefined,
};
