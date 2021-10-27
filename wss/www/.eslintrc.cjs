// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: [
    'airbnb',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  root: true,
  rules: {
    '@typescript-eslint/no-use-before-define': [
      'error',
    ],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        ts: 'never',
        tsx: 'never',
      },
    ],
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          path.resolve(__dirname, 'vite.config.ts'),
        ],
      },
    ],
    'react/jsx-filename-extension': [
      1,
      {
        extensions: [
          'tsx',
        ],
      },
    ],
    'no-use-before-define': 'off',
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: [
          '.ts',
          '.tsx',
        ],
      },
    },
  },
};
