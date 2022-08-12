import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    commonjsOptions: {
      exclude: '@neodrag/vue',
    },
  },
});
