import type {
  SimpleAlphabeticalData,
  SimpleData,
  SimpleDataItem,
} from 'types/api';
import type {
  FormLabelCompleteOnClick,
  FormParameterAdditionalProperties,
} from 'types/form';
import type {
  StoreFormParameter,
  StoreFormParameterOptionsItem,
} from 'types/store';

declare namespace Filter {
  /**
   * `filter`
   */
  type Store = {
    readonly applied: StoreApplied;
    category: StoreCategory;
    company: StoreCompany;
    mount: () => Promise<void>;
    reset: () => void;
    sortBy: StoreSortBy;
  };
  type StoreKeysParameters
    = StoreKeyParameterCategory
    | StoreKeyParameterCompany | StoreKeyParameterSortBy;
  type StoreKeysParametersAlphabetical
    = StoreKeyParameterCategory | StoreKeyParameterCompany;
  type StoreKeyParameterCategory = 'category';
  type StoreKeyParameterCompany = 'company';
  type StoreKeyParameterSortBy = 'sortBy';
  /**
   * `filter.applied`
   */
  type StoreApplied = (StoreCategory | StoreCompany | StoreSortBy)[] | [];
  /**
   * `filter.category`
   */
  type StoreCategory = StoreParameterAlphabetical;
  /**
   * `filter.company`
   */
  type StoreCompany = StoreParameterAlphabetical;
  /**
   * `filter.sortBy`
   */
  type StoreSortBy = StoreParameter;
  /**
   * `FilterApplied()`
   */
  type AppliedParameters
    = (ParameterParameter | ParameterAlphabeticalParameter)[] | [];
  /**
   * `FilterParameter()`
   */
  type ParameterOnChange = (item: StoreFormParameterOptionsItem) => void;
  type ParameterParameter = FormParameterAdditionalProperties & StoreParameter;
  /**
   * `FilterParameterAlphabetical()`
   */
  type ParameterAlphabeticalOnClick = (
    option: Parameters<StoreParameterAlphabetical['set']>[0],
    isChecked: Parameters<FormLabelCompleteOnClick>[0],
  ) => void;
  type ParameterAlphabeticalParameter
    = FormParameterAdditionalProperties & StoreParameterAlphabetical;
}

type StoreParameterAlphabetical
  = StoreParameterBase<SimpleAlphabeticalData, SimpleDataItem>;

type StoreParameter = StoreParameterBase<SimpleData, SimpleDataItem>;

interface StoreParameterBase<
  Options,
  Option extends StoreFormParameterOptionsItem>
  extends StoreFormParameter<Options, Option> {
  fetch: () => Promise<void>;
  readonly isApplied: boolean;
}

export = Filter;
