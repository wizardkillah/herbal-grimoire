import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { createBrumaHandler } from './scripts/bruma-api.mjs';

export default defineConfig({
  plugins: [react(), {
    name:'bruma-local-api',
    configureServer(server) {
      const bruma=createBrumaHandler();
      server.middlewares.use((req,res,next) => { if(req.url?.startsWith('/api/bruma')) void bruma(req,res); else next(); });
    },
  }],
  server: {
    port: 5173,
    strictPort: true,
    host: '127.0.0.1',
  },
});
