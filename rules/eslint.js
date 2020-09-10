const { resolve } = require('../utils');

const rule = {
  test: /\.(js)$/,
  loader: 'eslint-loader',
  enforce: 'pre',
  include: [resolve('./src')],
  options: { emitWarnings: true },
};

module.exports = rule;
