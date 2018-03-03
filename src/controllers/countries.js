const _ = require('lodash');
const knex = require('../db/connection');
const http = require('../utils/http');

module.exports = {
  async get(ctx) {
    try {
      const result = await knex
        .select('id', 'name', 'locale', 'is_default')
        .from('channels');

      const data = _(result)
        .groupBy('locale')
        .map((value, locale) => {
          const default_channel = _.find(value, 'is_default');
          return {
            locale,
            default_channel: default_channel ? default_channel.id : null,
            channels: _.map(value, v => ({
              id: v.id,
              name: v.name,
            })),
          };
        })
        .value();

      http.ok(ctx, data);
    } catch (err) {
      http.internalServerError(ctx, err);
    }
  },
};
