const CopyWebpackPlugin = require("copy-webpack-plugin");

const path = require('path');

module.exports = async ({ config }) => {
  config.plugins.push(
    new CopyWebpackPlugin({
      patterns: [{
        from: path.resolve(__dirname, './fonts'),
        to: 'static/fonts'
      }]
    }),
  );

  config.resolve.alias['#storybook'] = path.resolve(__dirname, './');

  return config;
};