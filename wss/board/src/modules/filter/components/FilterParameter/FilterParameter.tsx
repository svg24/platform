import type { FilterStoreParameter } from 'types/filter';
import {
  FilterParameterBase,
  FilterParameterBaseLabel,
} from './FilterParameterBase';

export const FilterParameter = ({
  onChange,
  pr,
}: {
  onChange: (opt: Parameters<FilterStoreParameter['set']>[0]) => void;
  pr: FilterStoreParameter;
}): JSX.Element => (
  <FilterParameterBase legend={pr.legend}>
    <>
      {pr.opts?.map((opt) => (
        <FilterParameterBaseLabel
          key={opt.id}
          opt={opt}
          pr={pr}
          onChange={() => {
            onChange(opt);
          }}
        />
      ))}
    </>
  </FilterParameterBase>
);
