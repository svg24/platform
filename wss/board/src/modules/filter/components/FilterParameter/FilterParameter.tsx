import { FormLabelComplete, FormParameter } from 'src/components';
import type { FormPropertyOnChange, FormPropertyParameter } from 'types/form';

export function FilterParameter({
  onChange,
  parameter,
}: {
  onChange: FormPropertyOnChange;
  parameter: FormPropertyParameter;
}): JSX.Element {
  return (
    <FormParameter
      className="filter-parameter"
      legend={parameter.legend}
    >
      {parameter.options?.map((option) => (
        <FormLabelComplete
          key={option.id}
          option={option}
          parameter={parameter}
          onChange={() => {
            onChange(option);
          }}
        />
      ))}
    </FormParameter>
  );
}
