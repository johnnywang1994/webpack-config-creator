const vueStyleLoader = require('./loaders/vue-style-loader');
const cssLoader = require('./loaders/css-loader');
const postcssLoader = require('./loaders/postcss-loader');
const sassLoader = require('./loaders/sass-loader');

const rule = (options) => ({
  test: /\.s?css$/i,
  use: [
    vueStyleLoader,
    cssLoader,
    postcssLoader,
    sassLoader(options),
  ],
});

module.exports = (options) => rule(options);
