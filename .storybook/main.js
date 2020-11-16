module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-essentials",
    '@storybook/addon-docs',
    '@storybook/preset-scss'
  ],
  babel: async (options) => ({
    ...options,
    "presets": ["@babel/preset-react"]
    // any extra options you want to set
  }),
};
