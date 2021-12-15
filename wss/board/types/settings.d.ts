import type {
  StoreFormParameter,
  StoreFormParameterOptions,
  StoreFormParameterOptionsItem,
} from 'types/store';

export interface SettingsStore {
  size: SettingsStoreSize;
}

type SettingsStoreSize
  = StoreFormParameter<
  StoreFormParameterOptions,
  StoreFormParameterOptionsItem>;
