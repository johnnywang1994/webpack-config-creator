const { isObject } = require('../../utils');

const createSassEnv = (envNames, append = '') => envNames
  .map((key) => `$${key.toLowerCase()}: ${JSON.stringify(process.env[key])};`)
  .concat(append)
  .join('');

const loader = {
  loader: 'sass-loader',
  options: {
    sourceMap: true,
  },
};

module.exports = (options) => {
  const { defineEnv, defineSass } = options;
  if (isObject(defineSass)) {
    const { injectEnv, data } = defineSass;
    loader.options.additionalData = injectEnv && defineEnv
      ? createSassEnv(defineEnv, data)
      : data;
  }
  return loader;
};
