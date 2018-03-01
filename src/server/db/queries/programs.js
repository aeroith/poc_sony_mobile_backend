const knex = require('../connection');

function getAllPrograms() {
  return knex
    .select('p.name',
    'p.id',
    'p.image_url AS local_image_url',
    'gp.type',
    'gp.tags',
    'gp.featured',
    'gp.image_url AS global_image_url')
    .from('programs AS p')
    .innerJoin('global_programs AS gp', 'p.global_program_id', 'gp.id')
}

function getSingleProgram(id) {
  return knex
    .select('p.name',
    'p.id',
    'p.image_url AS local_image_url',
    'gp.type',
    'gp.tags',
    'gp.featured',
    'gp.image_url AS global_image_url')
    .from('programs AS p')
    .innerJoin('global_programs AS gp', 'p.global_program_id', 'gp.id')
    .where('p.id', id);
}

module.exports = {
  getAllPrograms,
  getSingleProgram
};