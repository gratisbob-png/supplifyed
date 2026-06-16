import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { readFileSync } from 'fs';

// Load .env.local for integration tests (vitest doesn't load it automatically).
// This keeps CI safe: integration tests check SURREALDB_URL and skip if not reachable.
function loadEnvLocal(): Record<string, string> {
  try {
    return Object.fromEntries(
      readFileSync('.env.local', 'utf-8')
        .split('\n')
        .flatMap((line) => {
          const m = line.match(/^([^#\s][^=]*)=(.*)$/);
          return m ? [[m[1].trim(), m[2].trim()]] : [];
        })
    );
  } catch {
    return {};
  }
}

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./tests/setup.ts'],
    include: ['tests/**/*.test.ts', 'tests/**/*.test.tsx'],
    env: loadEnvLocal(),
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
});
