const { DefinePlugin } = require('webpack');

const createEnvObject = (envNames) => envNames.reduce(
  (acc, key) => ({ ...acc, [key]: JSON.stringify(process.env[key]) }),
  {},
);

// envName should not contain NODE_ENV which is defined by cross-env
module.exports = (envNames) => {
  if (!Array.isArray(envNames)) throw Error('envNames should be type array');
  const envObject = createEnvObject(envNames);
  return new DefinePlugin({ 'process.env': envObject });
};