const { parseQueryParams } = require('../utils/utils');
const knex = require('../db/connection');
const http = require('../utils/http');

module.exports = {
  async get(ctx) {
    console.log(ctx);
    const { q } = parseQueryParams(ctx.query);
    let query = knex
      .select(
        'p.name',
        'p.id',
        'p.image_url AS local_image_url',
        'p.description',
        'gp.type',
        'gp.tags',
        'gp.featured',
        'gp.image_url',
        'gp.tmdb_id',
      )
      .from('programs AS p')
      .innerJoin('global_programs AS gp', 'p.global_program_id', 'gp.id');

    if (q && q.length >= 3) {
      query = query.where('p.name', 'ilike', `%${q}%`);
    }

    try {
      const programs = await query;
      http.ok(ctx, programs);
    } catch (err) {
      http.internalServerError(ctx, err);
    }
  },

  async getOne(ctx) {
    const { id } = ctx.params;
    try {
      const programs = await knex
        .select(
          'p.name',
          'p.id',
          'p.image_url AS local_image_url',
          'p.description',
          'gp.type',
          'gp.tags',
          'gp.featured',
          'gp.image_url',
          'gp.tmdb_id',
        )
        .from('programs AS p')
        .innerJoin('global_programs AS gp', 'p.global_program_id', 'gp.id')
        .where('p.id', id);

      http.ok(ctx, programs);
    } catch (err) {
      http.internalServerError(ctx, err);
    }
  },
};
