import path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@svg24/www': path.resolve(__dirname),
      src: path.resolve(__dirname, 'src'),
    },
  },
  server: {
    host: process.env.WWW_HOST,
    port: parseInt(process.env.WWW_PORT, 10),
    hmr: {
      host: process.env.WWW_HMR_HOST,
      path: process.env.WWW_HMR_PATH,
      port: parseInt(process.env.WWW_HMR_PORT, 10),
      protocol: process.env.WWW_HMR_PROTOCOL,
    },
  },
});
