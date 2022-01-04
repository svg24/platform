import path from 'path';
import { fileURLToPath } from 'url';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      src: path.resolve(dirname, 'src'),
      types: path.resolve(dirname, 'types'),
    },
  },
  server: {
    host: process.env.BOARD_HOST,
    port: parseInt(process.env.BOARD_PORT, 10),
    hmr: {
      host: process.env.BOARD_HMR_HOST,
      path: process.env.BOARD_HMR_PATH,
      port: parseInt(process.env.BOARD_HMR_PORT, 10),
      protocol: process.env.BOARD_HMR_PROTOCOL,
    },
  },
});
