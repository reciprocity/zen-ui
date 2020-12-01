module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-docs",
    "@storybook/addon-essentials",
    "@storybook/preset-scss"
  ],
  babel: async (options) => ({
    ...options,
    "presets": [
      "@babel/preset-react",
      "@babel/preset-typescript"
    ]
    // any extra options you want to set
  }),
};
