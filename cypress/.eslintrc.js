module.exports = {
  // Ignore typings files since this config is only for .js files
  ignorePatterns: ['*.d.ts'],
  plugins: ['cypress'],
  extends: [
    'eslint:recommended',
    'plugin:cypress/recommended',
    'plugin:chai-friendly/recommended',
    'plugin:prettier/recommended',
    // Needs to be explicitly specified because it's important that
    // other extended rules don't override project root rules
    '../.eslintrc.js',
  ],
  env: {
    'cypress/globals': true,
  },
  globals: {
    cy: true,
  },
};
