declare namespace User {
  /**
   * `user`
   */
  type Store = {
    content: StoreContent;
    document: StoreDocument;
  };
  /**
   * `user.content`
   */
  type StoreContent = {
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
  /**
   * `user.document`
   */
  type StoreDocument = {
    _fontSize: number;
    toRem(value: number): number;
  };
}

export = User;
