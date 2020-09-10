const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const styleLoader = require('./loaders/style-loader');
const cssLoader = require('./loaders/css-loader');
const postcssLoader = require('./loaders/postcss-loader');
const sassLoader = require('./loaders/sass-loader');
const { isProd } = require('../utils');

const rule = (options) => ({
  test: /\.s?css$/i,
  use: [
    isProd ? MiniCssExtractPlugin.loader : styleLoader,
    cssLoader,
    postcssLoader,
    sassLoader(options),
  ],
});

module.exports = (options) => rule(options);
