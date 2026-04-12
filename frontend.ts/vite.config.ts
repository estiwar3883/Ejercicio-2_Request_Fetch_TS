import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    proxy: {
      // Redirige las peticiones de /api al backend de Next.js
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});