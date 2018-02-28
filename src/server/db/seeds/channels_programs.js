const bbPromise = require('bluebird')
const data = require('./data/index');
const tables = [
  'channels_programs',
  'locales_channels',
  'feed',
  'locales',
  'channels',
  'episodes',
  'programs',
  'global_programs',
];
exports.seed = function(knex, Promise) {
  return bbPromise.mapSeries(tables, table => knex(table).del())
    .then(() => bbPromise.map(tables, table => knex.raw(`ALTER SEQUENCE ${table}_id_seq RESTART WITH 1`)))
    .then(() => bbPromise.map(data.global_programs, f => knex('global_programs').insert({
      id: f.id,
      type: f.type,
      tags: JSON.stringify(f.tags),
      featured: f.featured,
      image_url: f.image_url,
    })))
    .then(() => bbPromise.map(data.programs, f => knex('programs').insert({
      id: f.id,
      name: f.name,
      description: f.description,
      global_program: f.global_program,
    })))
    .then(() => bbPromise.map(data.episodes, f => knex('episodes').insert({
      id: f.id,
      season: f.season,
      episode_number: f.episode_number,
      program: f.program,
    })))
    .then(() => bbPromise.map(data.channels, f => knex('channels').insert({
      id: f.id,
      name: f.name,
      is_default: f.is_default,
    })))
    .then(() => bbPromise.map(data.locales, f => knex('locales').insert({
      id: f.id,
      country: f.country,
      language: f.language,
    })))
    .then(() => bbPromise.map(data.feed, f => knex('feed').insert({
      id: f.id,
      start_time: f.start_time,
      end_time: f.end_time,
      channel: f.channel,
      program: f.program,
    })))
    .then(() => bbPromise.map(data.locales_channels, f => knex('locales_channels').insert({
      locale: f.locale,
      channel: f.channel,
    })))
    .then(() => bbPromise.map(data.channels_programs, f => knex('channels_programs').insert({
      channel: f.channel,
      program: f.program,
    })))
};
