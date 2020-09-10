module.exports = {
  loader: 'css-loader',
  options: {
    sourceMap: true,
    esModule: false // ^4.x.x default is true, will make vue-style-loader crash
  }
};
