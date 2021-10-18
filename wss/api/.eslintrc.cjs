const isProd = process.env.NODE_ENV === 'production';

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
  plugins: [
    'import',
  ],
  rules: {
    'import/extensions': ['error', 'ignorePackages', {
      ts: 'never',
    }],
    'no-console': isProd ? 'error' : 'off',
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: [
          '.ts',
        ],
      },
    },
  },
};
