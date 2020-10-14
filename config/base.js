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
    node: {
      setImmediate: false,
      dgram: 'empty',
      fs: 'empty',
      net: 'empty',
      tls: 'empty',
      child_process: 'empty',
    },
    // defined
    module: {
      rules: [],
    },
    plugins: [],
  };

  devServer && (config.devServer = {
    host: '0.0.0.0',
    disableHostCheck: true,
    inline: true,
    hot: true,
    historyApiFallback: true,
    overlay: { errors: true },
  });

  return config;
}
