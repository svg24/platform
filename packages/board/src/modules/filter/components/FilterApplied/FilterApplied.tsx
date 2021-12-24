import { XIcon } from '@heroicons/react/outline';
import { useStore } from 'src/store';
import type { AppliedParameters } from 'types/filter';

export function FilterApplied({
  parameters,
}: {
  parameters: AppliedParameters;
}): JSX.Element {
  const { content } = useStore();

  return (
    <fieldset className="filter-applied">
      {parameters.length
        ? (
          <>
            <legend className="filter-applied__legend">
              Applied filters
            </legend>
            {parameters.map((pr) => (
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
                    content.list.reset();
                  }}
                />
                <span className="filter-applied__name">
                  {`${pr.legend}: ${pr.value.current?.name}`}
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
}
