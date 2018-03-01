const path = require('path');
const _ = require('lodash');

const ROOT = path.resolve(__dirname, '../');
const NODE_ENV = _.defaultTo(process.env.NODE_ENV, 'development');

const isProd = NODE_ENV === 'production';
const isTest = NODE_ENV === 'test';
const isDev = NODE_ENV === 'development';

function normalizePort(val) {
  const port = parseInt(val, 10);

  if (_.isNaN(port)) {
    return val;
  }

  if (port >= 0) {
    return port;
  }

  return false;
}

module.exports = {
  server: {
    port: normalizePort(_.defaultTo(process.env.PORT, 3000)),
    host: _.defaultTo(process.env.HOST, 'localhost'),
    root: ROOT,
    data: path.join(ROOT, '../', '/data'),
  },

  env: {
    isDev,
    isProd,
    isTest,
  },
};

