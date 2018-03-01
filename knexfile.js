const path = require('path');

require('dotenv').config();

const { DB_CLIENT, DB_CONNECTION, DB_CONNECTION_TEST } = process.env;
const BASE_PATH = path.join(__dirname, 'src', 'db');

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
