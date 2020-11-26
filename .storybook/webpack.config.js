const CopyWebpackPlugin = require("copy-webpack-plugin");

const path = require('path');

module.exports = async ({ config }) => {
  // styles
  /* config.module.rules.push({
    test: /\.(sass|scss)$/,
    use: ['resolve-url-loader'],
    include: path.resolve(__dirname, '../')
  }); */

  // fonts
  /* config.module.rules.push({
    test: /\.(woff|woff2|eot|ttf)$/,
    use: [
      {
        loader: 'file-loader',
        query: {
          name: '[name].[ext]'
        }
      }
    ],
    include: path.resolve(__dirname, '../')
  }); */

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