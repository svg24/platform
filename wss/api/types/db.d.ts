declare namespace DataBase {
  function connect(): Promise<void>;
  function init(): Promise<void>;
  const options: {
    local: string;
    name: string;
    pass: string;
    uri: string;
    user: string;
  };
}

export = DataBase;
