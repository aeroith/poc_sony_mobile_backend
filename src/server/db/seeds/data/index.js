const { channels } = require('./channels');
const { episodes } = require('./episodes');
const { feed } = require('./feed');
const { programs } = require('./programs');
const { global_programs } = require('./global_programs');
const { locales } = require('./locales');
const { channels_programs } = require('./channels_programs');
const { locales_channels } = require('./locales_channels');

module.exports = {
  channels,
  episodes,
  feed,
  programs,
  global_programs,
  locales,
  locales_channels,
  channels_programs
};
