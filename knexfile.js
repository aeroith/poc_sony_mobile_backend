const path = require('path');

const BASE_PATH = path.join(__dirname, 'src', 'server', 'db');
module.exports = {
  test: {
    client: 'pg',
    connection: 'postgres://trcillis:postgres@localhost:5432/sony_poc_db_test',
    migrations: {
      directory: path.join(BASE_PATH, 'migrations'),
    },
    seeds: {
      directory: path.join(BASE_PATH, 'seeds'),
    },
  },
  development: {
    client: 'pg',
    connection: 'postgres://trcillis:postgres@localhost:5432/sony_poc_db',
    migrations: {
      directory: path.join(BASE_PATH, 'migrations'),
    },
    seeds: {
      directory: path.join(BASE_PATH, 'seeds'),
    },
  },
};
