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

export type FilterStoreParameter
  = FilterStoreParameterBase<ApiSimpleData>;

export type FilterStoreParameterAlphabetical
  = FilterStoreParameterBase<ApiSimpleAlphabeticalData>;

type FilterStoreParameterBase<T> = {
  fetch: () => Promise<void>;
  id: string;
  readonly isApplied: boolean;
  legend: string;
  opts: T | undefined;
  reset: () => void;
  set: (item: ApiSimpleDataItem) => void;
  val: {
    _cur: FilterStoreParameterBase<T>['val']['_def'];
    _def: ApiSimpleDataItem | undefined;
    checkIsCur: (id: ApiSimpleDataItem['id']) => boolean;
    cur: FilterStoreParameterBase<T>['val']['_cur'];
  };
};
