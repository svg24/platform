/**
 * @param {String} pack
 * @returns {import('eslint').Linter.ConfigOverride['files']}
 */
function getSourceTSFiles(pack) {
  return [`packages/${pack}/src/**/*.{ts,tsx}`];
}

/**
 * @param {String} pack
 * @returns {import('eslint').Linter.ConfigOverride['files']}
 */
function getTypeTSFiles(pack) {
  return [`packages/${pack}/types/*.d.ts`];
}

/**
 * @param {String} pack
 * @returns {import('eslint').Linter.ConfigOverride['files']}
 */
function getTSFiles(pack) {
  return [...getSourceTSFiles(pack), ...getTypeTSFiles(pack)];
}

/**
 * @type {import('eslint').Linter.ConfigOverride['files']}
 */
const JSFiles = ['**/*.{cjs,js}'];

/**
 * @param {String=} pack
 * @returns {import('eslint').Linter.BaseConfig['parserOptions']}
 */
function getParserOptions(pack) {
  return { project: `packages/${pack}/tsconfig.json` };
}

/**
 * @type {import('eslint').Linter.BaseConfig['extends']}
 */
const extendsTSBase = [
  'airbnb-base',
  'airbnb-typescript/base',
];

/**
 * @type {import('eslint').Linter.BaseConfig}
 */
module.exports = {
  root: true,
  env: {
    es2021: true,
  },
  overrides: [{
    files: getTSFiles('assets'),
    parserOptions: getParserOptions('assets'),
    env: {
      node: true,
    },
    extends: extendsTSBase,
  }, {
    files: getTSFiles('api'),
    parserOptions: getParserOptions('api'),
    env: {
      node: true,
    },
    extends: extendsTSBase,
  }, {
    files: getTSFiles('board'),
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
  }, {
    files: getTSFiles('www'),
    parserOptions: getParserOptions('www'),
    env: {
      browser: true,
    },
    extends: extendsTSBase,
  }, {
    files: JSFiles,
    extends: 'airbnb-base',
    rules: {
      'import/no-extraneous-dependencies': ['error', {
        devDependencies: ['./*.{cjs,js}'],
      }],
    },
  }, {
    files: [...JSFiles, ...getTSFiles('*')],
    parserOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
    },
    rules: {
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
  }, {
    files: getTSFiles('*'),
    parser: '@typescript-eslint/parser',
    extends: 'plugin:@typescript-eslint/recommended',
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
      '@typescript-eslint/method-signature-style': ['error', 'method'],
      '@typescript-eslint/no-confusing-void-expression': ['error'],
      '@typescript-eslint/no-empty-interface': ['error', {
        allowSingleExtends: true,
      }],
      '@typescript-eslint/no-explicit-any': ['off'],
    },
  }, {
    files: getSourceTSFiles('*'),
    rules: {
      'max-len': ['error', 80, 2, {
        ignoreUrls: true,
        ignoreComments: false,
        ignoreRegExpLiterals: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
      }],
    },
  }, {
    files: getTypeTSFiles('*'),
    rules: {
      'max-len': ['error', 120, 2, {
        ignoreUrls: true,
        ignoreComments: false,
        ignoreRegExpLiterals: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
      }],
    },
  }],
};
