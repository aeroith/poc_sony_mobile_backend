const knex = require('../db/connection');
const http = require('../utils/http');
const utils = require('../utils/utils');
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
      const params = ctx.query;
      let query = knex
        .select(
          'id',
          'name',
          'locale',
          'menu',
          'is_default',
          'rtl',
        )
        .from('channels');
      if (_.has(params, 'limit')) {
        query = query.limit(params.limit);
      }
      const channel = await query;
      http.ok(ctx, channel);
    } catch (err) {
      http.internalServerError(ctx, err);
    }
  },

  async getPrograms(ctx) {
    const { channel_id, program_id } = ctx.params;
    const params = parseQueryParams(ctx.query);
    const availableFields = [
      'name',
      'description',
      'local_image_url',
      'global_image_url',
      'type',
      'featured',
      'tags',
      'categories',
      'id',
      'tmdb_id',
    ];
    try {
      let query = knex
        .select(
          'p.id',
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
      if (_.has(params, 'limit')) {
        query = query.limit(params.limit);
      }
      if (_.has(params, 'order')) {
        query = utils.addOrderBy(query, availableFields, params.sort, params.order);
      }
      const programs = await query;
      http.ok(ctx, programs);
    } catch (err) {
      http.internalServerError(ctx, err);
    }
  },
};
