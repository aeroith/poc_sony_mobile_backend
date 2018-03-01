const knex = require('../db/connection');

module.exports = {
  async get(ctx) {
    try {
      const programs = await knex
        .select(
          'p.name',
          'p.id',
          'p.image_url AS local_image_url',
          'gp.type',
          'gp.tags',
          'gp.featured',
          'gp.image_url AS global_image_url',
        )
        .from('programs AS p')
        .innerJoin('global_programs AS gp', 'p.global_program_id', 'gp.id');

      if (programs.length) {
        ctx.body = {
          status: 'success',
          data: programs,
        };
      } else {
        ctx.status = 404;
        ctx.body = {
          status: 'error',
          message: 'That program does not exist.',
        };
      }
    } catch (error) {
      console.log(error);
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
          'gp.type',
          'gp.tags',
          'gp.featured',
          'gp.image_url AS global_image_url',
        )
        .from('programs AS p')
        .innerJoin('global_programs AS gp', 'p.global_program_id', 'gp.id')
        .where('p.id', id);

      if (programs.length) {
        ctx.body = {
          status: 'success',
          data: programs,
        };
      } else {
        ctx.status = 404;
        ctx.body = {
          status: 'error',
          message: 'That program does not exist.',
        };
      }
    } catch (error) {
      console.log(error);
    }
  },
};
