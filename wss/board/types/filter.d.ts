import type {
  ApiSimpleAlphabeticalData,
  ApiSimpleData,
  ApiSimpleDataItem,
} from 'types/api';
import type { Store } from 'types/store';

export interface FilterStore extends Store<FilterStore> {
  category: FilterStoreParameterAlphabetical;
  company: FilterStoreParameterAlphabetical;
  readonly getApplied: (FilterStoreParameter | FilterStoreParameterAlphabetical)[];
  mount: () => Promise<void>;
  reset: () => void;
  sortBy: FilterStoreParameter;
}

export type FilterStoreParameterAlphabeticalProperties = 'category' | 'company';

export type FilterStoreParameter
  = FilterStoreParameterBase<ApiSimpleData>;

export type FilterStoreParameterAlphabetical
  = FilterStoreParameterBase<ApiSimpleAlphabeticalData>;

type FilterStoreParameterBaseValueDefault = ApiSimpleDataItem | null;
type FilterStoreParameterBase<T> = {
  fetch: () => Promise<void>;
  id: string;
  readonly isApplied: boolean;
  legend: string;
  options: T | null;
  reset: () => void;
  set: (item: ApiSimpleDataItem) => void;
  value: {
    _current: FilterStoreParameterBaseValueDefault;
    _default: FilterStoreParameterBaseValueDefault;
    checkCurrent: (id: ApiSimpleDataItem['id']) => boolean;
    current: FilterStoreParameterBaseValueDefault;
  };
};
