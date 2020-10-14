const autoPreprocess = require('svelte-preprocess');

const rule = {
  test: /\.svelte$/,
  exclude: /node_modules/,
  loader: 'svelte-loader',
  options: {
    preprocess: autoPreprocess({})
  }
};

module.exports = rule;
