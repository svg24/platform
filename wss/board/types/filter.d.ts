import type {
  ApiSimpleAlphabeticalData,
  ApiSimpleData,
  ApiSimpleDataItem,
} from 'types/api';
import type {
  Store,
  StoreFormParameter,
  StoreFormParameterOptionsItem,
} from 'types/store';

export interface FilterStore extends Store<FilterStore> {
  category: FilterStoreParameterAlphabetical;
  company: FilterStoreParameterAlphabetical;
  readonly getApplied: (
    FilterStoreParameter
    | FilterStoreParameterAlphabetical
  )[];
  mount: () => Promise<void>;
  reset: () => void;
  sortBy: FilterStoreParameter;
}

export type FilterStoreParameters
  = FilterStoreParameterAlphabetical | FilterStoreParameter;
export type FilterStoreParametersIds
  = FilterStoreParameterAlphabeticalIds | FilterStoreParameterId;

export type FilterStoreParameterAlphabeticalIds = 'category' | 'company';
export type FilterStoreParameterAlphabetical
  = FilterStoreParameterBase<ApiSimpleAlphabeticalData, ApiSimpleDataItem>;

type FilterStoreParameterId = 'sortBy';
export type FilterStoreParameter
  = FilterStoreParameterBase<ApiSimpleData, ApiSimpleDataItem>;

interface FilterStoreParameterBase<
  Options,
  Option extends StoreFormParameterOptionsItem>
  extends StoreFormParameter<Options, Option> {
  fetch: () => Promise<void>;
  readonly isApplied: boolean;
}
