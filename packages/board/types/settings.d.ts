import type {
  FormParameter,
  FormParameterOptions,
  FormParameterOptionsItem,
} from 'types/store';

declare namespace Settings {
  /**
   * `settings`
   */
  type Store = {
    size: StoreSize;
  };
  /**
   * `settings.size`
   */
  type StoreSize = FormParameter<FormParameterOptions, FormParameterOptionsItem>;
}

export = Settings;
