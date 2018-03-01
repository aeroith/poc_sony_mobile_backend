const knex = require('../connection');

function getAllPrograms() {
  return knex('programs')
  .select('*');
}

function getSingleProgram(id) {
  return knex('programs')
  .select('*')
  .where({ id: parseInt(id) });
}

module.exports = {
  getAllPrograms,
  getSingleProgram
};