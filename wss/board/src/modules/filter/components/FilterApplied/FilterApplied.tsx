import { XIcon } from '@heroicons/react/outline';
import { LogosStore } from 'src/modules/logos';
import type {
  FilterStoreParameter,
  FilterStoreParameterAlphabetical,
} from 'types/filter';

export const FilterApplied = ({
  applied,
}: {
  applied: (FilterStoreParameter | FilterStoreParameterAlphabetical)[] | [];
}): JSX.Element => {
  const { ctx } = LogosStore;

  return (
    <fieldset className="filter-applied">
      {applied.length
        ? (
          <>
            <legend className="filter-applied__legend">
              Applied filters
            </legend>
            {applied.map((pr) => (
              <label
                className="filter-applied__label"
                key={pr.id}
              >
                <input
                  className="filter-applied__input"
                  type="checkbox"
                  checked
                  onChange={() => {
                    pr.reset();
                    ctx.list.reset();
                  }}
                />
                <span className="filter-applied__name">
                  {pr.val.cur?.name}
                </span>
                <XIcon className="filter-applies__icon" />
              </label>
            ))}
          </>
        )
        : (
          <legend className="filter-applied__legend">
            No filters applied
          </legend>
        )}
    </fieldset>
  );
};
