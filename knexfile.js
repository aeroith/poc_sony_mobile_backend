const path = require('path');

const ROOT = './';

require('dotenv').config({ path: path.join(ROOT, '.env') });

const { DB_CLIENT, DB_CONNECTION, DB_CONNECTION_TEST } = process.env;
const BASE_PATH = path.join(__dirname, 'src', 'server', 'db');

module.exports = {
  test: {
    client: DB_CLIENT || 'pg',
    connection: DB_CONNECTION,
    migrations: {
      directory: path.join(BASE_PATH, 'migrations'),
    },
    seeds: {
      directory: path.join(BASE_PATH, 'seeds'),
    },
  },
  development: {
    client: DB_CLIENT || 'pg',
    connection: DB_CONNECTION_TEST,
    migrations: {
      directory: path.join(BASE_PATH, 'migrations'),
    },
    seeds: {
      directory: path.join(BASE_PATH, 'seeds'),
    },
  },
};
