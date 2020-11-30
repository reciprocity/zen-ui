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
  }
}