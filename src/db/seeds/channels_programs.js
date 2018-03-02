const bbPromise = require('bluebird');
const data = require('./data');

const tables = [
  'channels_programs',
  'feed',
  'channels',
  'episodes',
  'programs',
  'global_programs',
];
exports.seed = function (knex) {
  return bbPromise.mapSeries(tables, table => knex(table).del())
    .then(() => bbPromise.map(tables, table => knex.raw(`ALTER SEQUENCE ${table}_id_seq RESTART WITH 1`)))
    .then(() => bbPromise.map(data.global_programs, f => knex('global_programs').insert({
      id: f.id,
      type: f.type,
      tags: JSON.stringify(f.tags),
      featured: f.featured,
      image_url: f.image_url,
      tmdb_id: f.tmdb_id,
      categories: JSON.stringify(f.categories),
    })))
    .then(() => bbPromise.map(data.programs, f => knex('programs').insert({
      id: f.id,
      name: f.name,
      description: f.description,
      global_program_id: f.global_program_id,
    })))
    .then(() => bbPromise.map(data.episodes, f => knex('episodes').insert({
      id: f.id,
      season: f.season,
      episode_number: f.episode_number,
      program_id: f.program_id,
      image_url: f.image_url,
    })))
    .then(() => bbPromise.map(data.channels, f => knex('channels').insert({
      id: f.id,
      locale: f.locale,
      name: f.name,
      menu: JSON.stringify(f.menu),
      is_default: f.is_default,
      rtl: f.rtl,
    })))
    .then(() => bbPromise.map(data.feed, f => knex('feed').insert({
      id: f.id,
      start_time: f.start_time,
      end_time: f.end_time,
      channel_id: f.channel_id,
      episode_id: f.episode_id,
    })))
    .then(() => bbPromise.map(data.channels_programs, f => knex('channels_programs').insert({
      channel_id: f.channel_id,
      program_id: f.program_id,
    })));
};
