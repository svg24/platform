import type {
  Store,
  StoreFormParameter,
  StoreFormParameterOptions,
  StoreFormParameterOptionsItem,
} from 'types/store';

export interface SettingsStore extends Store<SettingsStore> {
  size: SettingsStoreSize;
}

type SettingsStoreSize
  = StoreFormParameter<
  StoreFormParameterOptions,
  StoreFormParameterOptionsItem>;
