const { merge } = require('webpack-merge');
const createConfig = require('./base');
const { isObject, isFn } = require('../utils');

const resolveRule = (ruleName) => `../rules/${ruleName}`;
const resolvePlugin = (plName) => `../plugins/${plName}`;

let defaultConfig = null;

/**
 * Inject Rules
 * @param {*} options 
 */
function injectRules(options) {
  const { rules } = options;
  for (let i in rules) {
    try {
      let rule = require(resolveRule(rules[i]));
      defaultConfig.module.rules.push(
        isFn(rule) ? rule(options) : rule
      );
      rulePluginHandler(rules[i]);
    } catch(err) {
      console.warn(err);
    }
  }
}

/**
 * Merge configs
 * @param {*} options 
 */
function mergeConfig(options) {
  const { mode = 'production', extend = {} } = options;
  const isProd = mode === 'production';
  let config = merge(
    defaultConfig,
    isProd ? require('./prod') : require('./dev'),
  );
  if (isFn(extend)) {
    return extend(config) || config;
  }
  return merge(config, extend);
}

function rulePluginHandler(ruleName) {
  if (ruleName === 'vue') {
    defaultConfig.plugins.push(
      require(resolvePlugin('vueLoaderPlugin')));
  }
}

/**
 * Define Environment Varaibles
 * @param {*} options 
 */
function defineEnvHandler(options) {
  const { defineEnv } = options;
  if (Array.isArray(defineEnv)) {
    const definePlugin = require(resolvePlugin('definePlugin'));
    defaultConfig.plugins.push(definePlugin(defineEnv));
  }
}

/**
 * Define HTML Template
 * @param {*} options 
 */
function defineTemplate(options) {
  const { template } = options;
  if (template) {
    const htmlWebpackPlugin = require(resolvePlugin('htmlWebpackPlugin'));
    return defaultConfig.plugins.push(
      isObject(template)
        ? htmlWebpackPlugin(template)
        : htmlWebpackPlugin()
    );
  }
}

/**
 * Main Get Webpack Config
 * @param {*} options 
 */
function getDefaultConfig(options) {
  // create default config
  defaultConfig = createConfig(options);
  // inject rules
  injectRules(options);
  // set html template
  defineTemplate(options);
  // define env
  defineEnvHandler(options);
  // merge configs
  return mergeConfig(options);
}

module.exports = getDefaultConfig;
