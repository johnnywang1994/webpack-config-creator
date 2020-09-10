const { resolve } = require('../utils');

const rule = {
  test: /\.(js|vue)$/,
  loader: 'eslint-loader',
  enforce: 'pre',
  include: [resolve('./src')],
  options: { emitWarnings: true },
};

module.exports = rule;
