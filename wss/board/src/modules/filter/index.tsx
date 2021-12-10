import { observer } from 'mobx-react-lite';
import { ContentStore } from 'src/modules/content';
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
  const contentCtx = ContentStore.ctx;
  const filterCtx = FilterStore.ctx;

  const parameters = [
    deepAssign(filterCtx.sortBy, { legend: 'Sort by' }),
  ];
  const parametersAlphabetical = [
    deepAssign(filterCtx.category, { legend: 'Category' }),
    deepAssign(filterCtx.company, { legend: 'Company' }),
  ];

  const applied = {
    el: observer(() => <FilterApplied applied={filterCtx.getApplied} />),
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
              contentCtx.list.reset();
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

              contentCtx.list.reset();
            }}
          />
        ))}
        <applied.el />
      </>
    </FilterRoot>
  );
}
