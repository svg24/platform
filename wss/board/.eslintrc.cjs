const path = require('path');

module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['airbnb'],
  overrides: [{
    files: ['*.ts', '*.tsx', '*.d.ts'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
      ecmaVersion: 2021,
      project: [path.resolve(__dirname, 'tsconfig.json')],
      sourceType: 'module',
    },
    extends: [
      'airbnb-typescript',
      'plugin:@typescript-eslint/recommended',
      'plugin:react/jsx-runtime',
    ],
    rules: {
      '@typescript-eslint/array-type': ['error', {
        default: 'array',
      }],
      '@typescript-eslint/consistent-type-imports': ['error', {
        prefer: 'type-imports',
      }],
      '@typescript-eslint/explicit-function-return-type': ['error', {
        allowExpressions: true,
        allowTypedFunctionExpressions: true,
        allowHigherOrderFunctions: true,
        allowDirectConstAssertionInArrowFunctions: true,
        allowConciseArrowFunctionExpressionsStartingWithVoid: true,
      }],
      '@typescript-eslint/explicit-module-boundary-types': ['error', {
        allowArgumentsExplicitlyTypedAsAny: false,
        allowDirectConstAssertionInArrowFunctions: true,
        allowHigherOrderFunctions: true,
        allowTypedFunctionExpressions: true,
      }],
      '@typescript-eslint/member-delimiter-style': ['error', {
        multiline: {
          delimiter: 'semi',
          requireLast: true,
        },
        singleline: {
          delimiter: 'semi',
          requireLast: false,
        },
        multilineDetection: 'brackets',
      }],
      '@typescript-eslint/member-ordering': ['warn', {
        default: {
          order: 'as-written',
        },
        interfaces: {
          order: 'alphabetically',
        },
        typeLiterals: {
          order: 'alphabetically',
        },
      }],
      '@typescript-eslint/method-signature-style': ['error', 'property'],
      '@typescript-eslint/no-confusing-void-expression': ['error'],
      '@typescript-eslint/no-explicit-any': ['off'],
      'import/no-extraneous-dependencies': 'off',
      'react/jsx-filename-extension': [1, {
        extensions: ['tsx'],
      }],
      'react/jsx-max-props-per-line': [1, {
        maximum: 1,
      }],
      'react/jsx-sort-props': [1, {
        callbacksLast: true,
        shorthandLast: true,
      }],
      'react/no-danger': 'off',
    },
  }],
  root: true,
  rules: {
    'func-names': ['warn', 'never'],
    'import/no-extraneous-dependencies': ['error', {
      devDependencies: [path.resolve(__dirname, 'tailwind.config.cjs')],
    }],
    'import/order': ['error', {
      alphabetize: {
        order: 'asc',
      },
    }],
    'import/prefer-default-export': 'off',
    'no-underscore-dangle': 'off',
    'sort-imports': ['warn', {
      ignoreDeclarationSort: true,
    }],
  },
};
