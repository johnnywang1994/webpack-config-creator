const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { resolve } = require('../utils');

module.exports = new CleanWebpackPlugin({
  root: resolve('.'),
});
