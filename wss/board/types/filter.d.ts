import type {
  ApiResult,
  ApiResultAlphabetical,
  ApiResultDataItem,
} from 'types/api';
import type { Store } from 'types/store';

export interface FilterStore extends Store<FilterStore> {
  category: FilterStoreParameterAlphabetical;
  company: FilterStoreParameterAlphabetical;
  mount: () => Promise<void>;
  multiplier: number | undefined;
  reset: () => void;
  sortBy: FilterStoreParameter;
}

export type FilterStoreParameter
  = FilterStoreParameterBase<ApiResult['data']>;

export type FilterStoreParameterAlphabetical
  = FilterStoreParameterBase<ApiResultAlphabetical['data']>;

export type FilterStoreParameterBase<T> = {
  fetch: () => Promise<void>;
  id: string;
  readonly isActive: boolean;
  legend: string;
  opts: T | undefined;
  reset: () => void;
  set: (item: ApiResultDataItem) => void;
  val: {
    _cur: FilterStoreParameterBase<T>['val']['_def'];
    _def: ApiResultDataItem | undefined;
    checkIsCur: (id: ApiResultDataItem['id']) => boolean;
    cur: FilterStoreParameterBase<T>['val']['_cur'];
  };
};
