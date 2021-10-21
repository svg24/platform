declare namespace NodeJS {
  export interface ProcessEnv {
    API_PORT: string,
    DB_NAME: string,
    DB_PASS: string,
    DB_PORT: string,
    DB_USER: string,
    NODE_ENV: string,
  }
}
