import type {
  CategoriesResponseData,
  CategoriesResponseDataPropertyItem,
  CompaniesResponseData,
  CompaniesResponseDataPropertyItem,
  SortByResponseData,
  SortByResponseDataItem,
} from 'types/api';
import type {
  LabelCompleteOnClickParametersIsChecked,
  ParameterAdditionalProperties,
} from 'types/form';
import type { FormParameter, FormParameterOptionsItem } from 'types/store';

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
  type StoreCategory
    = StoreParameterBase<CategoriesResponseData,
    CategoriesResponseDataPropertyItem>;
  /**
   * `filter.company`
   */
  type StoreCompany
    = StoreParameterBase<CompaniesResponseData,
    CompaniesResponseDataPropertyItem>;
  /**
   * `filter.sortBy`
   */
  type StoreSortBy
    = StoreParameterBase<SortByResponseData, SortByResponseDataItem>;
  /**
   * `FilterApplied()`
   */
  type AppliedParameters
    = (ParameterParameter | ParameterAlphabeticalParameter)[] | [];
  /**
   * `FilterParameter()`
   */
  type ParameterOnChange = (item: FilterParametersOptionsItem) => void;
  type ParameterParameter = ParameterAdditionalProperties & FilterParameters;
  /**
   * `FilterParameterAlphabetical()`
   */
  type ParameterAlphabeticalOnClick = (
    option: FilterParametersAlphabeticalOptionsItem,
    isChecked: LabelCompleteOnClickParametersIsChecked,
  ) => void;
  type ParameterAlphabeticalParameter
    = ParameterAdditionalProperties & FilterParametersAlphabetical;
}

type FilterParameters = Filter.StoreSortBy;
type FilterParametersOptionsItem = Parameters<FilterParameters['set']>[0];
type FilterParametersAlphabetical = Filter.StoreCategory | Filter.StoreCompany;
type FilterParametersAlphabeticalOptionsItem
  = Parameters<FilterParametersAlphabetical['set']>[0];

interface StoreParameterBase<
  Options,
  Option extends FormParameterOptionsItem,
> extends FormParameter<Options, Option> {
  fetch: () => Promise<void>;
  readonly isApplied: boolean;
}

export = Filter;
