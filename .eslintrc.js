module.exports = {
  parserOptions: {
    project: './tsconfig.json',
  },
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
    'plugin:@stencil/recommended',
  ],
  env: {
    node: true,
  },
  rules: {
    // when single export, prefer using default over named export
    'import/prefer-default-export': 0,
    // if one param in arrow func, remove parentheses:
    'arrow-parens': ['error', 'as-needed'],
    // x++ is allowed, but should be careful with whitespaces:
    'no-plusplus': 0,
    // function input params can be reassigned:
    'no-param-reassign': 0,
    // Allow continue in loops:
    'no-continue': 0,
    // Allow console.logs:
    'no-console': 0,
    // Allow calling prototype methods directly on instances:
    'no-prototype-builtins': 0,
    // Allow complex ternaries:
    'no-nested-ternary': 0,
    // Switch statement doesn't have to define default case:
    'default-case': 0,
    // No space between function name and parens - function withoutSpace(x) {:
    'space-before-function-paren': 0,
    // Guard hasOwnProperty in for-in should be there, but we prefere return:
    // if (!x.hasOwnProperty(key)) return;
    'guard-for-in': 0,
    // Allow lexical declarations in case statement:
    'no-case-declarations': 0,

    // Stencil rules:
    '@stencil/async-methods': 'error',
    '@stencil/ban-prefix': ['error', ['stencil', 'stnl', 'st']],
    '@stencil/decorators-context': 'error',
    '@stencil/decorators-style': [
      'error',
      {
        prop: 'inline',
        state: 'inline',
        element: 'inline',
        event: 'inline',
        method: 'multiline',
        watch: 'multiline',
        listen: 'multiline',
      },
    ],
    '@stencil/element-type': 'error',
    '@stencil/host-data-deprecated': 'error',
    '@stencil/methods-must-be-public': 'error',
    '@stencil/no-unused-watch': 'error',
    '@stencil/own-methods-must-be-private': 0,
    '@stencil/own-props-must-be-private': 0,
    '@stencil/prefer-vdom-listener': 0,
    '@stencil/props-must-be-public': 'error',
    // '@stencil/props-must-be-readonly': 'error',
    '@stencil/render-returns-host': 'error',
    '@stencil/required-jsdoc': 'error',
    '@stencil/reserved-member-names': 'error',
    '@stencil/single-export': 'error',
    '@stencil/strict-mutable': 'error',
    // This type is not allowed in the 'if' condition because it is always truthy. Allowed types are boolean, null-union, undefined-union, or boolean-or-undefined:
    '@stencil/strict-boolean-conditions': 0,
    // JSX props should not use arrow functions:
    'react/jsx-no-bind': 0,
  },
};
