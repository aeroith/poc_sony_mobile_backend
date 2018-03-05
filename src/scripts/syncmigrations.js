const { ncp } = require('ncp'); // eslint-disable-line import/no-extraneous-dependencies

ncp.limit = 8;
const migrationSource = `${__dirname}/../../src/db/migrations`;
const migrationDestination = `${__dirname}/../../test/db/migrations`;
ncp(migrationSource, migrationDestination, (err) => {
  if (err) {
    return console.error(err);
  }
  return null;
});
