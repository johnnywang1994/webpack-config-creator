const path = require('path');

const isProd = process.env.NODE_ENV === 'production';
const resolve = p => path.resolve(process.cwd(), p);
const isFn = (v) => typeof v === 'function';
const isObject = (v) => v !== null && typeof v === 'object';

const createDevAPI = (callback) => {
  return function(app) {
    const apiHandler = (method, path, data) => {
      app[method](path, (req, res) => {
        res.json(data);
      });
    };
    callback.call(app, apiHandler);
  }
}

module.exports = {
  isProd,
  resolve,
  isFn,
  isObject,
  createDevAPI,
};
