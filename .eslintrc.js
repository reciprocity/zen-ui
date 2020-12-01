module.exports = {
  "parserOptions": {
    "project": "./tsconfig.json"
  },
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: ['airbnb-typescript/base'], // this is optional
  rules: {
    'import/prefer-default-export': 0,
    "arrow-parens": [ 'error', "as-needed" ],
    'no-plusplus': 0,
    'no-param-reassign': 0,
    'no-mixed-operators': 0,
    'no-continue': 0,
    'no-console': 0,
    'no-prototype-builtins': 0,
    'no-nested-ternary': 0,
    'default-case': 0,
    'space-before-function-paren': 0,
    'guard-for-in': 0,
  }
}
