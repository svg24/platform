export interface UserStore {
  content: UserStoreContent;
  document: UserStoreDocument;
}

type UserStoreContent = {
  list: {
    multiplier: {
      isApplied: boolean;
      value: {
        _default: number;
        current: number;
      };
    };
  };
};

type UserStoreDocument = {
  _fontSize: number;
  toRem: (value: number) => number;
};
