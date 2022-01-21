declare namespace NodeJS {
  interface ProcessEnv {
    DATABASE_DATA: string;
    DATABASE_LOGOS: string;
    DATABASE_NAME: string;
    DATABASE_PASS: string;
    DATABASE_PORT: string;
    DATABASE_USER: string;
    SERVER_HOST: string;
    SERVER_PORT: string;
  }
}

declare module '@babel/plugin-transform-react-jsx' {
  // This plugin has no types.
}
