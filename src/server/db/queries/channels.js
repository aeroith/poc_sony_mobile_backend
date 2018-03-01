const knex = require('../connection');

function getAllChannels() {
  return knex
    .select(
      'id',
      'name',
      'locale',
      'menu',
      'is_default',
    )
    .from('channels');
}

function getSingleChannel(id) {
  return knex
    .select('*')
    .from('channels')
    .where({ id });
}

function getFeedFromChannel(channelId, startTime, endTime) {
  const result = knex
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
    .where('f.channel_id', channelId);

  if (startTime && endTime) {
    return result
      .andWhere('start_time', '>=', startTime)
      .andWhere('end_time', '<=', endTime)
      .orderBy('start_time', 'asc');
  }
  return result.orderBy('start_time', 'asc');
}

module.exports = {
  getAllChannels,
  getSingleChannel,
  getFeedFromChannel,
};
