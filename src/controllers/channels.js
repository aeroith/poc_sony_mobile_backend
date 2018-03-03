const knex = require('../db/connection');
const http = require('../utils/http');
const _ = require('lodash');
const { parseQueryParams } = require('../utils/utils');

module.exports = {
  async getFeeds(ctx) {
    const { id } = ctx.params;
    const {
      startTime, endTime, limit, offset,
    } = ctx.query;

    let query = knex
      .select(
        'f.start_time',
        'f.end_time',
        'e.season',
        'e.episode_number',
        'e.description AS episode_description',
        'e.image_url AS episode_image_url',
        'p.name',
        'p.image_url',
      )
      .from('feed AS f')
      .innerJoin('episodes AS e', 'f.episode_id', 'e.id')
      .innerJoin('programs as p', 'e.program_id', 'p.id')
      .where('f.channel_id', id);

    if (startTime && endTime) {
      query = query
        .andWhere('start_time', '>=', startTime)
        .andWhere('end_time', '<=', endTime);
    }

    if (limit) query = query.limit(limit);

    if (offset) query = query.offset(offset);

    try {
      const feed = await query
        .orderBy('start_time', 'asc');

      http.ok(ctx, feed);
    } catch (err) {
      http.internalServerError(ctx, err);
    }
  },

  async getOne(ctx) {
    const { id } = ctx.params;
    try {
      const channel = await knex
        .select(
          'id',
          'name',
          'locale',
          'menu',
          'is_default',
          'rtl',
        )
        .from('channels')
        .where({ id });
      http.ok(ctx, channel);
    } catch (err) {
      http.internalServerError(ctx, err);
    }
  },

  async get(ctx) {
    try {
      const channel = await knex
        .select(
          'id',
          'name',
          'locale',
          'menu',
          'is_default',
          'rtl',
        )
        .from('channels');
      http.ok(ctx, channel);
    } catch (err) {
      http.internalServerError(ctx, err);
    }
  },

  async getPrograms(ctx) {
    const { channel_id, program_id } = ctx.params;
    const params = parseQueryParams(ctx.query);
    try {
      let query = knex
        .select(
          'p.name',
          'p.description',
          'p.image_url AS local_image_url',
          'gp.image_url AS global_image_url',
          'gp.type',
          'gp.featured',
          'gp.tags',
          'gp.categories',
          'gp.tmdb_id',
        )
        .from('channels AS c')
        .innerJoin('channels_programs AS cp', 'c.id', 'cp.channel_id')
        .innerJoin('programs AS p', 'cp.program_id', 'p.id')
        .innerJoin('global_programs AS gp', 'p.global_program_id', 'gp.id')
        .where('c.id', channel_id);
      if (program_id) {
        query = query.andWhere('p.id', program_id);
      }
      if (_.has(params, 'featured')) {
        query = query.andWhere('gp.featured', params.featured);
      }
      const programs = await query;
      http.ok(ctx, programs);
    } catch (err) {
      http.internalServerError(ctx, err);
    }
  },
};
