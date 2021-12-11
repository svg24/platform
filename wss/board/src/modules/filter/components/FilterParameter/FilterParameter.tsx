import { FormLabelComplete, FormParameter } from 'src/components';
import type {
  FilterParameterOnChange,
  FilterParameterParameter,
} from 'types/filter';

export function FilterParameter({
  onChange,
  parameter,
}: {
  onChange: FilterParameterOnChange;
  parameter: FilterParameterParameter;
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
