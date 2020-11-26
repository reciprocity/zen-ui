const CopyWebpackPlugin = require("copy-webpack-plugin");

const path = require('path');

module.exports = async ({ config }) => {
  config.plugins.push(
    new CopyWebpackPlugin({
      patterns: [{
        from: path.resolve(__dirname, '../src/fonts'),
        to: 'static/fonts'
      }]
    }),
  );

  return config;
};