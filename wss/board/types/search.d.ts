export interface SearchStore {
  process: (value: string) => void;
  reset: () => void;
  value: SearchStoreValue;
}

type SearchStoreValue = {
  _default: SearchStoreValueDefault;
  _previous: SearchStoreValueDefaultCurrent;
  current: SearchStoreValueDefaultCurrent;
};
type SearchStoreValueDefault = null;
type SearchStoreValueDefaultCurrent = string | SearchStoreValueDefault;
