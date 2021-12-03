export interface DB {
  connect: () => Promise<void>;
  getContent: (id: string) => Promise<DBContent | []>;
  init: () => Promise<void>;
  opts: {
    name: string;
    pass: string;
    uri: string;
    user: string;
  };
}

export type DBContent = {
  packages: {
    react: string;
    vue: string;
  };
  snippets: {
    vanilla: string;
  };
}[];
