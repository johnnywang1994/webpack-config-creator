const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const styleLoader = require('./loaders/style-loader');
const cssLoader = require('./loaders/css-loader');
const postcssLoader = require('./loaders/postcss-loader');
const isProd = process.env.NODE_ENV === 'production';

const rule = {
  test: /\.css$/i,
  use: [
    isProd ? MiniCssExtractPlugin.loader : styleLoader,
    cssLoader,
    postcssLoader,
  ],
};

module.exports = rule;
