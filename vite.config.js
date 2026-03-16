import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  base: './',
  plugins: [
    tailwindcss(),
  ],
  build: {
    rollupOptions: {
      input: {
        main: '/index.html',
        insumos: '/insumos.html',
      },
    },
  },
  test: {
    // Simula o DOM com JSDOM para testes de UI
    environment: 'jsdom',
    // Permite o uso de `document` e `window` globalmente nos testes
    globals: true,
  },
});
