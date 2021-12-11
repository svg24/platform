import type {
  StoreFormParameter,
  StoreFormParameterOptionsItem,
} from 'types/store';

export type FormParameterAdditionalProperties = { legend: string };

export type FormLabelCompleteOnClick = (isChecked: boolean) => void;
export type FormLabelCompleteOption = StoreFormParameterOptionsItem;
export type FormLabelCompleteParameter
  = StoreFormParameter<any, StoreFormParameterOptionsItem>;
