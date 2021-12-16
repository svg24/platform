import { observer } from 'mobx-react-lite';
import { useStore } from 'src/store';
import { deepCopy } from 'src/utils';
import { FilterApplied } from './components/FilterApplied';
import {
  FilterParameter,
  FilterParameterAlphabetical,
} from './components/FilterParameter';
import { FilterRoot } from './components/FilterRoot';
import { FilterStore } from './store';

function Filter(): JSX.Element {
  const { content, filter } = useStore();
  const parameters = [deepCopy(filter.sortBy, { legend: 'Sort by' })];
  const parametersAlphabetical = [
    deepCopy(filter.category, { legend: 'Category' }),
    deepCopy(filter.company, { legend: 'Company' }),
  ];
  const FilterAppliedObserved = observer(() => {
    const filtered = [...parameters, ...parametersAlphabetical]
      .filter((pr) => pr.isApplied);
    return (
      <FilterApplied parameters={filtered} />
    );
  });

  return (
    <FilterRoot>
      <>
        {parameters.map((pr) => (
          <FilterParameter
            key={pr.id}
            parameter={pr}
            onChange={(option) => {
              pr.set(option);
              content.list.reset();
            }}
          />
        ))}
        {parametersAlphabetical.map((pr) => (
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
}

export {
  Filter,
  FilterApplied,
  FilterParameter,
  FilterParameterAlphabetical,
  FilterStore,
};
