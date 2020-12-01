module.exports = {
  "parserOptions": {
    "project": "./tsconfig.json"
  },
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended'
  ],
  rules: {
    // when single export, prefer using default over named export
    'import/prefer-default-export': 0,
    // if one param in arrow func, remove parentheses:
    "arrow-parens": [ 'error', "as-needed" ],
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
  }
}
