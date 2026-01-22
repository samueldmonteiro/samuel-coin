import swc from 'unplugin-swc';
import { defineConfig } from 'vitest/config';
import tsConfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  test: {
    exclude: [
      'node_modules',
      'out',
      'dist',
      'coverage',
      'prisma',
      'src/migrations',
      'src/seed.ts',
    ],
    globals: true,
    root: './',
    projects: [
      {
        extends: true,
        test: {
          name: 'unit',
          dir: 'src/',
        },
      },

      {
        extends: true,
        test: {
          testTimeout: 15000,
          name: 'int',
          dir: 'tests/integration',
          setupFiles: ['./tests/integration/setup-file.ts'],
        },
      },
    ],
  },
  plugins: [
    tsConfigPaths(),
    swc.vite({
      module: { type: 'es6' },
    }) as any,
  ],
});
