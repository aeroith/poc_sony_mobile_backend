const knex = require('../db/connection');

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

      if (feed && feed.length) {
        ctx.body = {
          status: 'success',
          data: feed,
        };
      } else {
        ctx.status = 404;
        ctx.body = {
          status: 'error',
          message: 'There are no feed data between the given interval',
        };
      }
    } catch (err) {
      console.log(err);
    }
  },

  async getOne(ctx) {
    const { id } = ctx.params;
    try {
      const channel = await knex
        .select('*')
        .from('channels')
        .where({ id });
      if (channel.length) {
        ctx.body = {
          status: 'success',
          data: channel,
        };
      } else {
        ctx.status = 404;
        ctx.body = {
          status: 'error',
          message: 'That channel does not exist.',
        };
      }
    } catch (err) {
      console.log(err);
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
        )
        .from('channels');
      if (channel && channel.length) {
        ctx.body = {
          status: 'success',
          data: channel,
        };
      } else {
        ctx.status = 404;
        ctx.body = {
          status: 'error',
          message: 'That channel does not exist.',
        };
      }
    } catch (error) {
      console.log(error);
    }
  },
};
