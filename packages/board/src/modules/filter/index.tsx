import { observer } from 'mobx-react-lite';
import { forwardRef } from 'react';
import { useStore } from 'src/store';
import { deepCopy } from 'src/utils';
import { FilterApplied } from './components/FilterApplied';
import {
  FilterParameter,
  FilterParameterAlphabetical,
} from './components/FilterParameter';
import { FilterRoot } from './components/FilterRoot';
import { FilterStore } from './store';

const Filter = forwardRef<HTMLFormElement>((_, ref) => {
  const { content, filter } = useStore();
  const params = [
    deepCopy(filter.sortBy, { legend: 'Sort by' }),
  ];
  const paramsAlphabetical = [
    deepCopy(filter.category, { legend: 'Category' }),
    deepCopy(filter.company, { legend: 'Company' }),
  ];
  const FilterAppliedObserved = observer(() => {
    const filtered = [
      ...params,
      ...paramsAlphabetical,
    ].filter((pr) => pr.isApplied);
    return <FilterApplied parameters={filtered} />;
  });

  return (
    <FilterRoot ref={ref}>
      <>
        {params.map((pr) => (
          <FilterParameter
            key={pr.id}
            parameter={pr}
            onChange={(option) => {
              pr.set(option);
              content.list.reset();
            }}
          />
        ))}
        {paramsAlphabetical.map((pr) => (
          <FilterParameterAlphabetical
            key={pr.id}
            parameter={pr}
            onClick={(option, checked) => {
              if (checked) {
                pr.reset();
              } else {
                pr.set(option);
              }

              content.list.reset();
            }}
          />
        ))}
        <FilterAppliedObserved />
      </>
    </FilterRoot>
  );
});

export {
  Filter,
  FilterApplied,
  FilterParameter,
  FilterParameterAlphabetical,
  FilterStore,
};
