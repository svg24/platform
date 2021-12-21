import { FormLabelComplete, FormParameter } from 'src/components';
import type {
  ParameterOnChange,
  ParameterParameter,
} from 'types/filter';

export function FilterParameter({
  onChange,
  parameter,
}: {
  onChange: ParameterOnChange;
  parameter: ParameterParameter;
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
