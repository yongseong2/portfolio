import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      // Images are pre-sized WebP files, and printing to PDF relies on plain <img> loading behavior.
      '@next/next/no-img-element': 'off',
      // `{ node: _node, ...props }` strips props before spreading them onto DOM elements.
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_', ignoreRestSiblings: true }],
    },
  },
  globalIgnores(['.next/**', 'out/**', 'next-env.d.ts']),
]);
