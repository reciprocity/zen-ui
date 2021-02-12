module.exports = {
  plugins: ['cypress'],
  extends: [
    'eslint:recommended',
    'plugin:cypress/recommended',
    'plugin:chai-friendly/recommended',
    'plugin:prettier/recommended',
  ],
  env: {
    node: true,
    'cypress/globals': true,
  },
  globals: {
    cy: true,
  },
};
