const _ = require('lodash');
const knex = require('../db/connection');
const http = require('../utils/http');

module.exports = {
  async get(ctx) {
    const { locale: _locale } = ctx.params;

    try {
      let query = knex
        .select('id', 'name', 'locale', 'is_default', 'menu', 'url', 'logo')
        .from('channels');

      if (_locale) query = query.where('locale', _locale);

      const data = await query;
      const countries = _(data)
        .groupBy('locale')
        .map((value, locale) => {
          const default_channel = _.find(value, 'is_default');
          return {
            locale,
            default_channel: default_channel ? default_channel.id : null,
            channels: _.map(value, v => ({
              id: v.id,
              name: v.name,
              menu: v.menu,
              url: v.url,
              logo: v.logo,
            })),
          };
        })
        .value();
      http.ok(ctx, countries);
    } catch (err) {
      http.internalServerError(ctx, err);
    }
  },
};
