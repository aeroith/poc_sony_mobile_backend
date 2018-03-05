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
        'f.id',
        'f.start_time',
        'f.end_time',
        'e.season',
        'e.episode_number',
        'e.description AS episode_description',
        'e.name AS episode_name',
        'e.image_url AS episode_image_url',
        'p.name',
        'p.image_url',
        'gp.type',
      )
      .from('feed AS f')
      .innerJoin('episodes AS e', 'f.episode_id', 'e.id')
      .innerJoin('programs as p', 'e.program_id', 'p.id')
      .innerJoin('global_programs as gp', 'p.global_program_id', 'gp.id')
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

  async getPrograms(ctx) { // eslint-disable-line consistent-return
    const { channel_id, program_id } = ctx.params;
    const params = parseQueryParams(ctx.query);
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
      if (_.has(params, 'sort')) {
        let sortParams = params.sort.split('_');
        if (sortParams.length !== 2 || sortParams[1] !== 'asc') {
          sortParams = [sortParams[0], 'desc'];
        }
        if (sortParams.length > 2) {
          sortParams = sortParams.slice(0, 2);
        }
        switch (sortParams[0]) {
          case 'name':
            query = query
              .orderBy('p.name', sortParams[1]);
            break;
          case 'id':
            query = query
              .orderBy('id', sortParams[1]);
            break;
          default:
            return http.badRequest(ctx);
        }
      }
      const programs = await query;
      http.ok(ctx, programs);
    } catch (err) {
      http.internalServerError(ctx, err);
    }
  },

  async getProgramsWithEpisodes(ctx) { // eslint-disable-line consistent-return
    const { channel_id } = ctx.params;
    const params = parseQueryParams(ctx.query);
    try {
      let query;
      if (_.has(params, 'distinct')) {
        query = knex
          .distinct(knex.raw('ON (p.name) p.name'));
      } else {
        query = knex.select('p.name');
      }
      query = query
        .select(
          'e.id',
          'p.description',
          'p.image_url AS local_image_url',
          'gp.image_url AS global_image_url',
          'gp.type',
          'gp.featured',
          'gp.tags',
          'gp.categories',
          'gp.tmdb_id',
          'e.description',
          'e.season',
          'e.episode_number',
        )
        .from('channels AS c')
        .innerJoin('channels_programs AS cp', 'c.id', 'cp.channel_id')
        .innerJoin('programs AS p', 'cp.program_id', 'p.id')
        .innerJoin('global_programs AS gp', 'p.global_program_id', 'gp.id')
        .innerJoin('episodes AS e', 'p.id', 'e.program_id');
      if (channel_id) {
        query = query
          .where('c.id', channel_id);
      }
      if (_.has(params, 'featured')) {
        query = query.andWhere('gp.featured', params.featured);
      }
      if (_.has(params, 'search')) {
        query = query.andWhere('p.name', 'like', `%${params.search}%`);
      }
      if (_.has(params, 'distinct')) {
        query = query.orderBy('p.name');
      }
      if (_.has(params, 'sort')) {
        let sortParams = params.sort.split('_');
        if (sortParams.length !== 2 || sortParams[1] !== 'asc') {
          sortParams = [sortParams[0], 'desc'];
        }
        if (sortParams.length > 2) {
          sortParams = sortParams.slice(0, 2);
        }
        switch (sortParams[0]) {
          case 'episode':
            query = query
              .orderBy('e.season', sortParams[1])
              .orderBy('e.episode_number', sortParams[1]);
            break;
          case 'id':
            query = query
              .orderBy('id', sortParams[1]);
            break;
          default:
            return http.badRequest(ctx);
        }
      }
      if (_.has(params, 'limit')) {
        query = query.limit(params.limit);
      }
      const episodes = await query;
      http.ok(ctx, episodes);
    } catch (err) {
      http.internalServerError(ctx, err);
    }
  },
};
