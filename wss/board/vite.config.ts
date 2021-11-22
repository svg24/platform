import path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      src: path.resolve(__dirname, 'src'),
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
