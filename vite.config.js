import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import react from '@vitejs/plugin-react';
import autoprefixer from 'autoprefixer';
import tailwindcss from 'tailwindcss';
import { defineConfig } from 'vite';
import tailwindConfig from './tailwind.config.cjs';

const FILENAME = fileURLToPath(import.meta.url);
const DIRNAME = dirname(FILENAME);
const PACKAGES = resolve(DIRNAME, 'packages');

/**
 * @type {import('vite').UserConfig}
 */
const config = {};

/**
 * // @param {import('vite').ConfigEnv} env
 * @returns {import('vite').UserConfig}
 */
function defineBoard() {
  const PACKAGE = `${PACKAGES}/board`;
  const ROOT = `${PACKAGE}/src`;

  Object.assign(config, {
    root: PACKAGE,
    plugins: [react()],
    resolve: {
      alias: {
        src: ROOT,
        types: `${PACKAGE}/types`,
      },
    },
    css: {
      postcss: {
        plugins: [
          autoprefixer,
          tailwindcss({
            ...tailwindConfig,
            purge: [`${PACKAGE}/index.html`, `${ROOT}/**/*.{ts,tsx}`],
          }),
        ],
      },
    },
  });

  // if (command === 'serve-board') {
  Object.assign(config, {
    server: {
      host: import.meta.env.VITE_SERVER_HOST,
      port: parseInt(import.meta.env.VITE_SERVER_PORT, 10),
      hmr: {
        host: import.meta.env.VITE_SERVER_HMR_HOST,
        path: import.meta.env.VITE_SERVER_HMR_PATH,
        port: parseInt(import.meta.env.VITE_SERVER_HMR_PORT, 10),
        protocol: import.meta.env.VITE_SERVER_HMR_PROTOCOL,
      },
    },
  });

  return config;
}

export default defineConfig(() => {
  /**
   * Vite not support custom command.
   * If, under this project, will adds new packages that will use the tool,
   * then you will need to write support for custom commands.
   * @see https://github.com/vitejs/vite/blob/main/packages/vite/src/node/cli.ts
   */
  // if ((/(-board)$/).test(env.command)) defineBoard(env);
  defineBoard();

  return config;
});
