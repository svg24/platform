/// <reference types="vite/client" />

declare namespace NodeJS {
  export interface ProcessEnv {
    VITE_SERVER_HMR_HOST: string;
    VITE_SERVER_HMR_PATH: string;
    VITE_SERVER_HMR_PORT: string;
    VITE_SERVER_HMR_PROTOCOL: string;
    VITE_SERVER_HOST: string;
    VITE_SERVER_PORT: string;
  }
}
