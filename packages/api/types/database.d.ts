declare namespace Database {
  interface Constructor {
    connect(): Promise<void>;
    init(): Promise<void>;
    options: {
      data: string;
      logos: string;
      name: string;
      pass: string;
      uri: string;
      user: string;
    };
  }
}

export = Database;
