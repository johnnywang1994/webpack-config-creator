const HtmlWebpackPlugin = require('html-webpack-plugin');
const { resolve, isProd } = require('../utils');

const config = {
  template: resolve('./index.html'),
  filename: 'index.html',
  inject: true,
  minify: isProd
    ? {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true,
      }
    : false,
};

module.exports = (options) => {
  if (options) {
    const { input, output } = options;
    input && (config.template = input);
    output && (config.filename = output);
  }
  return new HtmlWebpackPlugin(config);
};
