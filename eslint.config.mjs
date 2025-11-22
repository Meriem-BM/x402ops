import { dirname } from 'path';
import { fileURLToPath } from 'url';

import { FlatCompat } from '@eslint/eslintrc';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import importPlugin from 'eslint-plugin-import';
import prettier from 'eslint-plugin-prettier';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...nextVitals,
  ...nextTs,
  {
    ignores: [
      '.gitignore',
      '.prettierignore',
      '.eslintcache',
      'node_modules/**',
      'dist/**',
      'build/**',
      'coverage/**',
      'public/**',
      'out/**',
      'storybook-static/**',
      '.next/**',
      '.vscode/**',
    ],
  },
  {
    plugins: {
      prettier: prettier,
      import: importPlugin,
    },
    rules: {
      'no-console': 'warn',
      'no-unused-vars': 'off', // Turn off base rule
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      '@next/next/no-img-element': 'off',
      'react/no-unescaped-entities': 'off',
      'prettier/prettier': 'error', // Enable prettier rule

      // Import sorting rules
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
          pathGroups: [
            {
              pattern: 'react',
              group: 'external',
              position: 'before',
            },
            {
              pattern: '@/**',
              group: 'internal',
              position: 'after',
            },
          ],
          pathGroupsExcludedImportTypes: ['react'],
        },
      ],
      'import/no-duplicates': 'error',
      'import/no-unresolved': 'off', // Disable for TypeScript projects
    },
  },
  {
    files: ['**/*.stories.@(js|jsx|ts|tsx)'],
    rules: {
      'import/no-anonymous-default-export': 'off',
    },
  },
];

export default eslintConfig;
