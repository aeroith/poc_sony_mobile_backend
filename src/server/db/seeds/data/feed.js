const moment = require('moment');

const feed = [
  {
    start_time: moment().toISOString(),
    end_time: moment().add(1, 'hours').toISOString(),
    channel_id: 1,
    episode_id: 1,
  },
  {
    start_time: moment().toISOString(),
    end_time: moment().add(1, 'hours').toISOString(),
    channel_id: 2,
    episode_id: 1,
  },
  {
    start_time: moment().toISOString(),
    end_time: moment().add(1, 'hours').toISOString(),
    channel_id: 3,
    episode_id: 1,
  },
  {
    start_time: moment().add(1, 'hours').toISOString(),
    end_time: moment().add(2, 'hours').toISOString(),
    channel_id: 1,
    episode_id: 2,
  },
  {
    start_time: moment().add(1, 'hours').toISOString(),
    end_time: moment().add(2, 'hours').toISOString(),
    channel_id: 2,
    episode_id: 2,
  },
  {
    start_time: moment().add(1, 'hours').toISOString(),
    end_time: moment().add(2, 'hours').toISOString(),
    channel_id: 3,
    episode_id: 2,
  },
  {
    start_time: moment().add(2, 'hours').toISOString(),
    end_time: moment().add(3, 'hours').toISOString(),
    channel_id: 1,
    episode_id: 3,
  },
  {
    start_time: moment().add(2, 'hours').toISOString(),
    end_time: moment().add(3, 'hours').toISOString(),
    channel_id: 2,
    episode_id: 3,
  },
  {
    start_time: moment().add(2, 'hours').toISOString(),
    end_time: moment().add(3, 'hours').toISOString(),
    channel_id: 3,
    episode_id: 3,
  },
  {
    start_time: moment().add(3, 'hours').toISOString(),
    end_time: moment().add(4, 'hours').toISOString(),
    channel_id: 1,
    episode_id: 4,
  },
  {
    start_time: moment().add(3, 'hours').toISOString(),
    end_time: moment().add(4, 'hours').toISOString(),
    channel_id: 2,
    episode_id: 4,
  },
  {
    start_time: moment().add(3, 'hours').toISOString(),
    end_time: moment().add(4, 'hours').toISOString(),
    channel_id: 3,
    episode_id: 4,
  },
];

module.exports = { feed };
