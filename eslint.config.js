import js from '@eslint/js';
import globals from 'globals';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

export default [
  // Files and folders that ESLint should ignore
  {
    ignores: [
      'dist/**',
      'dist-ssr/**',
      'server/dist/**',
      'node_modules/**',
      'coverage/**',
      'server/uploads/resumes/**',
    ],
  },

  // Base ESLint recommended rules
  js.configs.recommended,

  // Frontend TypeScript and React files
  {
    files: ['src/**/*.{ts,tsx}'],

    languageOptions: {
      parser: tsParser,

      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },

      globals: {
        ...globals.browser,
        ...globals.es2021,
      },
    },

    plugins: {
      '@typescript-eslint': tseslint,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },

    rules: {
      // TypeScript handles undefined variables and types
      'no-undef': 'off',

      // TypeScript recommended rules
      ...tseslint.configs.recommended.rules,

      // React Hooks rules
      ...reactHooks.configs.recommended.rules,

      // React Fast Refresh rule
      'react-refresh/only-export-components': [
        'warn',
        {
          allowConstantExport: true,
        },
      ],

      // Unused variables
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
    },
  },

  // Backend, scripts and Vite configuration
  {
    files: [
      'server/**/*.{ts,tsx}',
      'scripts/**/*.{ts,tsx}',
      'vite.config.ts',
    ],

    languageOptions: {
      parser: tsParser,

      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },

      globals: {
        ...globals.node,
        ...globals.es2021,
      },
    },

    plugins: {
      '@typescript-eslint': tseslint,
    },

    rules: {
      // TypeScript handles undefined variables and types
      'no-undef': 'off',

      // TypeScript recommended rules
      ...tseslint.configs.recommended.rules,

      // Unused variables
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
    },
  },
];