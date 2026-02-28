import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  test: {
    // Simula o DOM com JSDOM para testes de UI
    environment: 'jsdom',
    // Permite o uso de `document` e `window` globalmente nos testes
    globals: true,
  },
});
