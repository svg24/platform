import type {
  ApiSimpleAlphabeticalData,
  ApiSimpleData,
  ApiSimpleDataItem,
} from 'types/api';
import type { Store } from 'types/store';

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

export type FilterStoreParameterAlphabetical
  = FilterStoreParameterBase<ApiSimpleAlphabeticalData>;
export type FilterStoreParameterAlphabeticalProperties = 'category' | 'company';

export type FilterStoreParameter = FilterStoreParameterBase<ApiSimpleData>;

type FilterStoreParameterBase<T> = {
  fetch: () => Promise<void>;
  id: string;
  readonly isApplied: boolean;
  legend: string;
  options: T | null;
  reset: () => void;
  set: (item: ApiSimpleDataItem) => void;
  value: FilterStoreParameterBaseValue;
};
type FilterStoreParameterBaseValue = {
  _current: FilterStoreParameterBaseValueCurrent;
  _default: FilterStoreParameterBaseValueDefault;
  checkCurrent: (id: FilterStoreParameterBaseValueArgumentId) => boolean;
  current: FilterStoreParameterBaseValueCurrent;
};
type FilterStoreParameterBaseValueCurrent
  = FilterStoreParameterBaseValueDefault;
type FilterStoreParameterBaseValueDefault = ApiSimpleDataItem | null;
type FilterStoreParameterBaseValueArgumentId = ApiSimpleDataItem['id'];
