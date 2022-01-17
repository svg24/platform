declare namespace Settings {
  /**
   * `settings`
   */
  type Store = {
    filter: SettingsParameter;
    mount(): Promise<void>;
    size: SettingsParameter;
  };
  interface SettingsParameter {
    fetch(): void;
    id: string;
    options: {
      [key: string]: SettingsParameterOptionsItem;
    };
    reset(): void;
    set(option: SettingsParameterOptionsItem): void;
    value: SettingsParameterValue;
  }
}

type SettingsParameterOptionsItem = {
  id: SettingsParameterOptionsItemId;
  index: number;
  name: string;
};
type SettingsParameterOptionsItemId = string;
type SettingsParameterValue = {
  _current: SettingsParameterOptionsItem;
  _default: SettingsParameterOptionsItem;
  checkIsCurrent(id: SettingsParameterOptionsItemId): boolean;
  current: SettingsParameterOptionsItem;
};

export = Settings;
