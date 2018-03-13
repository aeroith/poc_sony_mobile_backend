const knex = require('../db/connection');
const http = require('../utils/http');

module.exports = {
  async get(ctx) {
    const query = knex
      .select(
        'e.id',
        'e.season',
        'e.episode_number',
        'e.name',
        'e.description',
        'e.image_url AS episode_image_url',
        'p.name',
        'p.image_url AS local_image_url',
        'gp.type',
        'gp.featured',
        'gp.tags',
        'gp.categories',
        'gp.image_url AS global_image_url',
        'gp.tmdb_id',
        'gp.poster_image',
        'f.start_time',
        'f.end_time',
      )
      .from('episodes AS e')
      .innerJoin('programs AS p', 'e.program_id', 'p.id')
      .innerJoin('global_programs AS gp', 'p.global_program_id', 'gp.id')
      .innerJoin('feed AS f', 'e.id', 'f.id');
    try {
      const episodes = await query;
      http.ok(ctx, episodes);
    } catch (err) {
      http.internalServerError(ctx, err);
    }
  },
  async getOne(ctx) {
    const { id } = ctx.params;
    const query = knex
      .select(
        'e.id',
        'e.season',
        'e.episode_number',
        'e.name',
        'e.description',
        'e.image_url AS episode_image_url',
        'p.name',
        'p.image_url AS local_image_url',
        'gp.type',
        'gp.featured',
        'gp.tags',
        'gp.categories',
        'gp.image_url AS global_image_url',
        'gp.tmdb_id',
        'gp.poster_image',
        'f.start_time',
        'f.end_time',
      )
      .from('episodes AS e')
      .innerJoin('programs AS p', 'e.program_id', 'p.id')
      .innerJoin('global_programs AS gp', 'p.global_program_id', 'gp.id')
      .innerJoin('feed AS f', 'e.id', 'f.id')
      .where('e.id', id);
    try {
      const episode = await query;
      http.ok(ctx, episode);
    } catch (err) {
      http.internalServerError(ctx, err);
    }
  },
};
