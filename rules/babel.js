const { resolve } = require('../utils');

const rule = {
  test: /\.js$/,
  loader: 'babel-loader',
  exclude: /(node_modules|bower_components)/,
  include: [resolve('./src')],
  options: {
    presets: [
      [
        '@babel/preset-env',
        { modules: false }
      ]
    ],
    comments: false,
    plugins: [
      '@babel/plugin-syntax-dynamic-import',
      '@babel/plugin-transform-runtime'
    ]
  }
};

module.exports = rule;
