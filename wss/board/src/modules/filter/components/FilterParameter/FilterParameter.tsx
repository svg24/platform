import { LogosStore } from 'src/modules/logos';
import type { FilterStoreParameter } from 'types/filter';

export const FilterParameter = ({
  pr,
}: {
  pr: FilterStoreParameter;
}): JSX.Element => {
  const { ctx } = LogosStore;

  return (
    <fieldset className="filter-parameter filter-parameter_as-container">
      <legend className="filter-parameter__legend">
        {pr.legend}
      </legend>
      {pr.opts?.map((opt) => (
        <label
          className="filter-parameter__label"
          key={opt.id}
        >
          <input
            className="filter-parameter__input"
            defaultChecked={pr.val.checkIsCur(opt.id)}
            name={pr.id}
            type="radio"
            onChange={() => {
              pr.set(opt);
              ctx.list.reset();
            }}
          />
          <span className="filter-parameter__name">
            {opt.name}
          </span>
        </label>
      ))}
    </fieldset>
  );
};
