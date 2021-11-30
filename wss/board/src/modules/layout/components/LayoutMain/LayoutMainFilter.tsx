import { observer } from 'mobx-react-lite';
import {
  FilterApplied,
  FilterParameter,
  FilterParameterAlphabetical,
  FilterStore,
} from 'src/modules/filter';

export const LayoutMainFilter = (): JSX.Element => {
  const { ctx } = FilterStore;

  const applied = {
    el: observer(() => {
      const prs = [
        ctx.category,
        ctx.company,
        ctx.sortBy,
      ].filter((pr) => pr.isActive);

      return <FilterApplied prs={prs} />;
    }),
  };

  return (
    <form className="layout-main__filter">
      {[ctx.sortBy].map((pr) => (
        <FilterParameter
          key={pr.id}
          pr={pr}
        />
      ))}
      {[ctx.category, ctx.company].map((pr) => (
        <FilterParameterAlphabetical
          key={pr.id}
          pr={pr}
        />
      ))}
      <applied.el />
    </form>
  );
};
