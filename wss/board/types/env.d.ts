/// <reference types="vite/client" />

declare namespace NodeJS {
  export interface ProcessEnv {
    BOARD_HMR_HOST: string;
    BOARD_HMR_PATH: string;
    BOARD_HMR_PORT: string;
    BOARD_HMR_PROTOCOL: string;
    BOARD_HOST: string;
    BOARD_PORT: string;
  }
}
