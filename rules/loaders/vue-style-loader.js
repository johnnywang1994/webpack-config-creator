const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { isProd } = require('../../utils');

module.exports = isProd
  ? MiniCssExtractPlugin.loader
  : 'vue-style-loader';