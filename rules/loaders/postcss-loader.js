// paste below setting into package.json
// "browserslist": [
//   "> 1%",
//   "last 2 versions",
//   "not ie <= 8"
// ]

module.exports = {
  loader: 'postcss-loader',
  options: {
    postcssOptions: {
      plugins: [
        'autoprefixer'
      ]
    },
  }
};
