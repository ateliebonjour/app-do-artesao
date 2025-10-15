import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // Simula o DOM com JSDOM para testes de UI
    environment: 'jsdom',
    // Permite o uso de `document` e `window` globalmente nos testes
    globals: true,
  },
});

