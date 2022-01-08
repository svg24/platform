/**
 * @param {String} pack
 * @returns {String[]}
 */
function getFiles(pack) {
  const local = `packages/${pack}/`;
  return [
    `${local}src/**/*.{ts,tsx}`,
    `${local}types/*.d.ts`,
  ];
}

/**
 * @param {String=} pack
 * @returns {any}
 */
function getParserOptions(pack) {
  const config = 'tsconfig.json';
  return {
    ecmaVersion: 2021,
    project: [pack ? `packages/${pack}/${config}` : config],
    sourceType: 'module',
  };
}

const overriddenAirbnbRules = {
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
};

module.exports = {
  root: true,
  env: {
    es2021: true,
  },
  overrides: [{
    files: ['**/*.{cjs,js}'],
    parserOptions: {
      ecmaVersion: 2021,
    },
    extends: 'airbnb-base',
    rules: {
      ...overriddenAirbnbRules,
      'import/no-extraneous-dependencies': ['error', {
        devDependencies: ['./*.{cjs,js}'],
      }],
    },
  }, {
    files: getFiles('*'),
    parser: '@typescript-eslint/parser',
    parserOptions: getParserOptions(),
    extends: 'plugin:@typescript-eslint/recommended',
    rules: {
      ...overriddenAirbnbRules,
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
      '@typescript-eslint/no-empty-interface': ['error', {
        allowSingleExtends: true,
      }],
      '@typescript-eslint/no-explicit-any': ['off'],
    },
  }, {
    files: getFiles('assets'),
    parserOptions: getParserOptions('assets'),
    env: {
      node: true,
    },
    extends: [
      'airbnb-base',
      'airbnb-typescript/base',
    ],
    rules: overriddenAirbnbRules,
  }, {
    files: getFiles('api'),
    parserOptions: getParserOptions('api'),
    env: {
      node: true,
    },
    extends: [
      'airbnb-base',
      'airbnb-typescript/base',
    ],
    rules: {
      ...overriddenAirbnbRules,
      'no-console': 'off',
    },
  }, {
    files: getFiles('board'),
    parserOptions: getParserOptions('board'),
    env: {
      browser: true,
    },
    extends: [
      'airbnb',
      'airbnb-typescript',
      'plugin:react/jsx-runtime',
    ],
    rules: {
      ...overriddenAirbnbRules,
      'jsx-a11y/label-has-associated-control': ['error', {
        labelComponents: [],
        labelAttributes: [],
        controlComponents: [],
        assert: 'nesting',
        depth: 25,
      }],
      'react/function-component-definition': ['error', {
        namedComponents: 'function-declaration',
        unnamedComponents: 'function-expression',
      }],
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
};
