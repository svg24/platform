import { observer } from 'mobx-react-lite';
import { ContentStore } from 'src/modules/content';
import {
  FilterApplied,
  FilterParameter,
  FilterParameterAlphabetical,
  FilterStore,
} from 'src/modules/filter';

export const LayoutMainFilter = (): JSX.Element => {
  const contentCtx = ContentStore.ctx;
  const filterCtx = FilterStore.ctx;

  const applied = {
    el: observer(() => <FilterApplied applied={filterCtx.getApplied} />),
  };

  return (
    <form className="layout-main__filter">
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
    </form>
  );
};
