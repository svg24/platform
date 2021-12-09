import { observer } from 'mobx-react-lite';
import { ContentStore } from 'src/modules/content';
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

  const applied = {
    el: observer(() => <FilterApplied applied={filterCtx.getApplied} />),
  };

  return (
    <FilterRoot>
      <>
        {[filterCtx.sortBy].map((pr) => (
          <FilterParameter
            key={pr.id}
            pr={pr}
            onChange={(opt) => {
              pr.set(opt);
              contentCtx.list.reset();
            }}
          />
        ))}
        {[filterCtx.category, filterCtx.company].map((pr) => (
          <FilterParameterAlphabetical
            key={pr.id}
            pr={pr}
            onClick={(opt, checked) => {
              if (checked) {
                pr.reset();
              } else {
                pr.set(opt);
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
