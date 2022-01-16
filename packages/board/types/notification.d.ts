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
    isNegative: boolean;
    isPositive: boolean;
    reset(): void;
    setNegative(): void;
    setPositive(): void;
    value: StoreTypeValue;
  };
  type StoreTypeValue = {
    _default: StoreTypeValueDefault;
    current: 'negative' | 'positive' | StoreTypeValueDefault;
  };
  type StoreTypeValueDefault = null;
}

export = Notification;
