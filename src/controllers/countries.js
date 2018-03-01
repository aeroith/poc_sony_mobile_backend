const _ = require('lodash');
const knex = require('../db/connection');

module.exports = {
  async get(ctx) {
    try {
      const result = await knex
        .select('id', 'name', 'locale', 'is_default')
        .from('channels');

      const data = _(result)
        .groupBy('locale')
        .map((value, locale) => ({
          locale,
          default_channel: _.find(value, 'is_default').id,
          channels: _.map(value, v => ({
            id: v.id,
            name: v.name,
          })),
        }))
        .value();

      if (data && data.length) {
        ctx.body = {
          status: 'success',
          data,
        };
      } else {
        ctx.status = 404;
        ctx.body = {
          status: 'error',
          message: 'No countries were found',
        };
      }
    } catch (err) {
      console.log(err);
    }
  },
};
