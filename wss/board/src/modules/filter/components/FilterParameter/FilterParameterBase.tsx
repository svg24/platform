import { observer } from 'mobx-react-lite';
import { useRef } from 'react';
import {
  FormContainer,
  FormInput,
  FormLabelBase,
  FormLegend,
  FormParameter,
} from 'src/components';
import type {
  FilterStoreParameter,
  FilterStoreParameterAlphabetical,
} from 'types/filter';

type Parameter = FilterStoreParameter | FilterStoreParameterAlphabetical;

export function FilterParameterBase({
  children,
  legend,
}: {
  children: JSX.Element;
  legend: Parameter['legend'];
}): JSX.Element {
  const { className } = FormParameter({}).props;

  return (
    <FormParameter className={`${className} filter-parameter`}>
      <FormLegend>
        {legend}
      </FormLegend>
      <FormContainer>
        {children}
      </FormContainer>
    </FormParameter>
  );
}

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
        <FormInput
          defaultChecked={isCur}
          name={parameter.id}
          ref={input.ref}
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
    <FormLabelBase name={option.name}>
      <input.el />
    </FormLabelBase>
  );
};

FilterParameterBaseLabel.defaultProps = {
  onChange: undefined,
  onClick: undefined,
};
