module.exports = {
  root: true,
  env: {
    es2021: true,
    node: true,
  },
  extends: [
    'airbnb-base',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['import'],
  rules: {
    '@typescript-eslint/no-shadow': ['error'],
    'import/extensions': ['error', 'ignorePackages', {
      ts: 'never',
    }],
    'import/no-extraneous-dependencies': ['error', {
      devDependencies: ['**/*.test.ts'],
    }],
    'import/prefer-default-export': 'off',
    'no-console': 'off',
    'no-shadow': 'off',
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.ts'],
      },
    },
  },
};
