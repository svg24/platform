import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react(),
  ],
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
