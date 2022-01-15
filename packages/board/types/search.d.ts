import type { ItemResponseMetaName } from 'types/api';

declare namespace Search {
  /**
   * `search`
   */
  type Store = {
    process(value: ItemResponseMetaName): void;
    reset(): void;
    value: StoreValue;
  };
  /**
   * `store.value`
   */
  type StoreValue = {
    _default: StoreValueDefault;
    _previous: StoreValueDefaultCurrent;
    current: StoreValueDefaultCurrent;
  };
  type StoreValueDefault = null;
  type StoreValueDefaultCurrent = ItemResponseMetaName | StoreValueDefault;
}

export = Search;
