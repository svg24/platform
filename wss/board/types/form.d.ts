import type {
  StoreFormParameter,
  StoreFormParameterOptions,
  StoreFormParameterOptionsItem,
} from 'types/store';

export type FormPropertyOnChange
  = (option: StoreFormParameterOptionsItem) => void;

export type FormPropertyParameter = { legend: string } & FormStoreParameter;
type FormStoreParameter
  = StoreFormParameter<
  StoreFormParameterOptions,
  StoreFormParameterOptionsItem>;
