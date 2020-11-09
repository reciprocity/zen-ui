const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials"
  ],
  webpackFinal: async (config, { configType }) => {
    // watch:storybook configType === 'DEVELOPMENT'
    // build:storybook configType === 'PRODUCTION'
    if (configType === 'PRODUCTION') {
      config = doProd(config);
    }

    return config;
  },
}

const doProd = (config) => {
  const { name, distDirs } = require('../package.json');
  const OUTPUT_DIR = path.join(__dirname, '../' + distDirs.stencil);
  const mainJs = path.join(OUTPUT_DIR, `cjs/${name}.cjs.js`);

  // override HtmlWebpackPlugin to inject stencil into storybook prod
  // template default: @storybook/core/dist/server/templates/index.ejs
  config.plugins[1].options = {
    ...config.plugins[1].options,
    template: path.resolve(__dirname, 'index.override.ejs'),
  };
  // no stencil build exists
  if (!fs.existsSync(mainJs)) {
    console.error(chalk.black.bgRed(`---------------------------------`));
    console.error(chalk.black.bgRed(`Run 'npm run build:stencil' first`));
    console.error(chalk.black.bgRed(`---------------------------------`));
  }
  return config;
};