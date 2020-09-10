const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const cleanWebpackPlugin = require('../plugins/cleanWebpackPlugin');
const miniCssExtractPlugin = require('../plugins/miniCssExtractPlugin');

module.exports = {
  devtool: false,
  output: {
    filename: '[name].[contenthash].js',
  },
  plugins: [
    cleanWebpackPlugin,
    miniCssExtractPlugin,
  ],
  optimization: {
    minimizer: [
      new TerserPlugin(),
      new OptimizeCSSAssetsPlugin(),
    ],
  }
};
