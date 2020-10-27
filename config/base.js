const { resolve } = require('../utils');

module.exports = (options) => {
  const {
    mode,
    devServer = false,
  } = options;

  const config = {
    mode,
    entry: resolve('./src/main.js'),
    output: {
      path: resolve('./dist'),
      publicPath: '/'
    },
    optimization: {
      splitChunks: { chunks: 'all' },
    },
    resolve: {
      extensions: ['.mjs', '.js', '.vue', '.json', '.scss', '.svelte'],
      alias: {
        '@': resolve('./src'),
      }
    },
    // defined
    module: {
      rules: [],
    },
    plugins: [],
  };

  if (devServer) {
    const df = {
      host: '0.0.0.0',
      disableHostCheck: true,
      inline: true,
      hot: true,
      historyApiFallback: true,
      overlay: { errors: true },
    };
    config.devServer = typeof devServer === 'object'
      ? Object.assign(df, devServer)
      : df;
  }

  return config;
}
