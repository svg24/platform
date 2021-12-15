import { observer } from 'mobx-react-lite';
import { useStore } from 'src/store';
import { deepAssign } from 'src/utils';
import { FilterApplied } from './components/FilterApplied';
import {
  FilterParameter,
  FilterParameterAlphabetical,
} from './components/FilterParameter';
import { FilterRoot } from './components/FilterRoot';
import { FilterStore } from './store';

export {
  FilterApplied,
  FilterParameter,
  FilterParameterAlphabetical,
  FilterStore,
};

export function Filter(): JSX.Element {
  const { content, filter } = useStore();

  const parameters = [
    deepAssign(filter.sortBy, { legend: 'Sort by' }),
  ];
  const parametersAlphabetical = [
    deepAssign(filter.category, { legend: 'Category' }),
    deepAssign(filter.company, { legend: 'Company' }),
  ];

  const applied = {
    el: observer(() => <FilterApplied applied={filter.getApplied} />),
  };

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
        <applied.el />
      </>
    </FilterRoot>
  );
}
