module.exports = (ruleName = 'vue') => {
  if (ruleName === 'vue-next') {
    const { VueLoaderPlugin } = require('vue-loader-next');
    return new VueLoaderPlugin();
  }
  const { VueLoaderPlugin } = require('vue-loader');
  return new VueLoaderPlugin();
};
