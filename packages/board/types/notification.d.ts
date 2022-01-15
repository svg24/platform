declare namespace Notification {
  type Store = {
    _isVisible: StoreIsVisible;
    description: StoreDescription;
    hide(): void;
    isVisible: StoreIsVisible;
    show(): void;
    showNegative(description: string): void;
    showPositive(description: string): void;
    type: StoreType;
  };
  type StoreIsVisible = boolean;
  type StoreDescription = {
    reset(): void;
    set(value: StoreDescriptionValueCurrent): void;
    value: StoreDescriptionValue;
  };
  type StoreDescriptionValue = {
    _default: StoreDescriptionValueDefault;
    current: StoreDescriptionValueCurrent | StoreDescriptionValueDefault;
  };
  type StoreDescriptionValueDefault = null;
  type StoreDescriptionValueCurrent = string;
  type StoreType = {
    reset(): void;
    set(value: StoreTypeValueCurrent): void;
    value: StoreTypeValue;
  };
  type StoreTypeValue = {
    _default: StoreTypeValueDefault;
    current: StoreTypeValueCurrent | StoreTypeValueDefault;
  };
  type StoreTypeValueDefault = null;
  type StoreTypeValueCurrent = 'negative' | 'positive';
}

export = Notification;
