const rule = {
  test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
  loader: 'url-loader',
  options: {
    limit: 1000,
    name: '[name].[ext]',
    outputPath: 'img',
    esModule: false, // same problem to css-loader
  },
};

module.exports = rule;
