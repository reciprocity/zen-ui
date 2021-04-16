const path = require('path');

module.exports = {
  parserOptions: {
    tsconfigRootDir: path.join(__dirname, '..'),
    project: './tsconfig.json',
  },
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@stencil/recommended',
    'plugin:prettier/recommended',
    // Needs to be explicitly specified because it's important that
    // other extended rules don't override project root rules
    '../.eslintrc.js',
  ],
  rules: {
    /**
     * JSX
     */
    // JSX props should not use arrow functions
    'react/jsx-no-bind': 0,

    /**
     * Stencil
     */
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
        // watch: 'multiline',
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
    '@stencil/props-must-be-readonly': 'error',
    '@stencil/render-returns-host': 'error',
    '@stencil/required-jsdoc': 'error',
    '@stencil/reserved-member-names': 'error',
    '@stencil/single-export': 'error',
    '@stencil/strict-mutable': 'error',
    // This type is not allowed in the 'if' condition because it is always
    // truthy. Allowed types are boolean, null-union, undefined-union, or
    // boolean-or-undefined
    '@stencil/strict-boolean-conditions': 0,
  },
};
