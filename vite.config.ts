/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import eslint from 'vite-plugin-eslint';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), eslint()],
  base: '/vite-ts-react/',
  build: {
    sourcemap: true
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './test-setup.ts',
  },
  define: {
    APP_VERSION: JSON.stringify(process.env.npm_package_version),
  },
})
