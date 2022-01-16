import {
  FormContainer,
  FormLabelComplete,
  FormParameterWithoutContainer,
} from 'src/components';
import type {
  ParameterAlphabeticalOnClick,
  ParameterAlphabeticalParameter,
} from 'types/filter';

export function FilterParameterAlphabetical({
  onClick,
  parameter,
}: {
  onClick: ParameterAlphabeticalOnClick;
  parameter: ParameterAlphabeticalParameter;
}): JSX.Element {
  return (
    <FormParameterWithoutContainer
      className="filter-parameter"
      legend={parameter.legend}
    >
      <ul className="filter-parameter__list">
        {parameter.options && Object.entries(parameter.options)
          .map(([key, value]) => (
            <li
              className="filter-parameter__item"
              key={key}
            >
              <span className="filter-parameter__letter">
                {key}
              </span>
              <FormContainer>
                {value.map((option) => (
                  <FormLabelComplete
                    key={option.id}
                    option={option}
                    parameter={parameter}
                    onClick={(isChecked) => {
                      onClick(option, isChecked);
                    }}
                  />
                ))}
              </FormContainer>
            </li>
          ))}
      </ul>
    </FormParameterWithoutContainer>
  );
}
