import type { FilterStoreParameter } from 'types/filter';
import {
  FilterParameterBase,
  FilterParameterBaseLabel,
} from './FilterParameterBase';

export const FilterParameter = ({
  onChange,
  parameter,
}: {
  onChange: (option: Parameters<FilterStoreParameter['set']>[0]) => void;
  parameter: FilterStoreParameter;
}): JSX.Element => (
  <FilterParameterBase legend={parameter.legend}>
    <>
      {parameter.options?.map((option) => (
        <FilterParameterBaseLabel
          key={option.id}
          option={option}
          parameter={parameter}
          onChange={() => {
            onChange(option);
          }}
        />
      ))}
    </>
  </FilterParameterBase>
);
