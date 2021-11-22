declare namespace NodeJS {
  export interface ProcessEnv {
    API_HOST: string,
    API_PORT: string,
    DB_COLLECTION: string,
    DB_NAME: string,
    DB_PASS: string,
    DB_PORT: string,
    DB_USER: string,
    NODE_ENV: string,
  }
}
