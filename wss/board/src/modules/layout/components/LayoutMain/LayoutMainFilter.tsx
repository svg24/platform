import { observer } from 'mobx-react-lite';
import {
  FilterApplied,
  FilterAppliedInput,
  FilterAppliedLabel,
  FilterParameter,
  FilterParameterAlphabetical,
  FilterParameterAlphabeticalInput,
  FilterParameterAlphabeticalItem,
  FilterParameterInput,
  FilterParameterLabel,
} from 'src/components/Filter';
import { LogosStore } from 'src/modules/logos';
// import { LayoutFilterApplied } from '../LayoutFilterApplied';

const LayoutMainFilterParameters = (): JSX.Element => {
  const { ctx } = LogosStore;

  return (
    <>
      {[
        ctx.filter.params.sortBy,
      ].map((par) => (
        <FilterParameter
          key={par.id}
          legend={par.legend}
        >
          {par.opts.map((opt) => (
            <FilterParameterLabel
              key={opt.id}
              name={opt.name}
            >
              <FilterParameterInput
                id={par.id}
                isChecked={opt.id === par.val.def}
                onChange={() => {
                  par.set(opt.id);
                  ctx.list.reset();
                }}
              />
            </FilterParameterLabel>
          ))}
        </FilterParameter>
      ))}
    </>
  );
};

const LayoutMainFilterParametersAlphabetical = (): JSX.Element => {
  const { ctx } = LogosStore;

  return (
    <>
      {[
        ctx.filter.params.categories,
        ctx.filter.params.companies,
      ].map((par) => (par.opts
        ? (
          <FilterParameterAlphabetical
            key={par.id}
            legend={par.legend}
          >
            {Object.entries(par.opts).map(([key, val]) => (
              <FilterParameterAlphabeticalItem
                key={key}
                letter={key}
              >
                {val.map((opt) => (
                  <FilterParameterLabel
                    key={opt.id}
                    name={opt.name}
                  >
                    <FilterParameterAlphabeticalInput
                      id={par.id}
                      onClick={(el) => {
                        const target = el.target as HTMLInputElement;

                        if (target.checked && opt.id === par.val.cur) {
                          par.reset();

                          target.checked = false;
                        } else {
                          par.set(opt.id);
                        }

                        ctx.list.reset();
                      }}
                    />
                  </FilterParameterLabel>
                ))}
              </FilterParameterAlphabeticalItem>
            ))}
          </FilterParameterAlphabetical>
        )
        : <></>))}
    </>
  );
};

const LayoutMainFilterApplied = (): JSX.Element => {
  const { ctx } = LogosStore;

  const applied = {
    el: observer(() => {
      const active = [
        ctx.filter.params.categories,
        ctx.filter.params.companies,
        ctx.filter.params.search,
        ctx.filter.params.sortBy,
      ].filter((prop) => prop.isActive);

      return active.length
        ? (
          <FilterApplied legend="Applied filers">
            {active.map((prop) => (
              <FilterAppliedLabel
                key={prop.id}
                name={prop.val.cur || ''}
              >
                <FilterAppliedInput
                  onChange={() => {}}
                />
              </FilterAppliedLabel>
            ))}
          </FilterApplied>
        )
        : <FilterApplied legend="No filters applied" />;
    }),
  };

  return <applied.el />;
};

export const LayoutMainFilter = (): JSX.Element => (
  <form className="layout-main__filter">
    <LayoutMainFilterParameters />
    <LayoutMainFilterParametersAlphabetical />
    <LayoutMainFilterApplied />
  </form>
);
