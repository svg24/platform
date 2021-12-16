import type { FormParameter, FormParameterOptionsItem } from 'types/store';

declare namespace Form {
  /**
   * `FormParameter()`
   */
  type ParameterAdditionalProperties = {
    legend: string;
  };
  /**
   * `LabelComplete()`
   */
  type LabelCompleteOnClick
    = (isChecked: LabelCompleteOnClickParametersIsChecked) => void;
  type LabelCompleteOnClickParametersIsChecked = boolean;
  type LabelCompleteOption = FormParameterOptionsItem;
  type LabelCompleteParameter = FormParameter<any, FormParameterOptionsItem>;
}

export = Form;
