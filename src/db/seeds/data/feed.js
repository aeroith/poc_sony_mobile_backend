const moment = require('moment');

const feed = [
  {
    start_time: moment().add(1, 'hours').unix(Number),
    end_time: moment().add(2, 'hours').unix(Number),
    channel_id: 1,
    episode_id: 1,
  },
  {
    start_time: moment().add(1, 'hours').unix(Number),
    end_time: moment().add(2, 'hours').unix(Number),
    channel_id: 2,
    episode_id: 1,
  },
  {
    start_time: moment().add(2, 'hours').unix(Number),
    end_time: moment().add(3, 'hours').unix(Number),
    channel_id: 2,
    episode_id: 7,
  },
  {
    start_time: moment().add(1, 'hours').unix(Number),
    end_time: moment().add(2, 'hours').unix(Number),
    channel_id: 3,
    episode_id: 1,
  },
  {
    start_time: moment().add(2, 'hours').unix(Number),
    end_time: moment().add(3, 'hours').unix(Number),
    channel_id: 1,
    episode_id: 3,
  },
  {
    start_time: moment().add(2, 'hours').unix(Number),
    end_time: moment().add(3, 'hours').unix(Number),
    channel_id: 3,
    episode_id: 2,
  },
  {
    start_time: moment().add(3, 'hours').unix(Number),
    end_time: moment().add(4, 'hours').unix(Number),
    channel_id: 1,
    episode_id: 5,
  },
  {
    start_time: moment().add(3, 'hours').unix(Number),
    end_time: moment().add(4, 'hours').unix(Number),
    channel_id: 2,
    episode_id: 3,
  },
  {
    start_time: moment().add(3, 'hours').unix(Number),
    end_time: moment().add(4, 'hours').unix(Number),
    channel_id: 3,
    episode_id: 3,
  },
  {
    start_time: moment().add(4, 'hours').unix(Number),
    end_time: moment().add(5, 'hours').unix(Number),
    channel_id: 1,
    episode_id: 6,
  },
  {
    start_time: moment().add(4, 'hours').unix(Number),
    end_time: moment().add(5, 'hours').unix(Number),
    channel_id: 2,
    episode_id: 4,
  },
  {
    start_time: moment().add(4, 'hours').unix(Number),
    end_time: moment().add(5, 'hours').unix(Number),
    channel_id: 3,
    episode_id: 4,
  },
  {
    start_time: moment().add(5, 'hours').unix(Number),
    end_time: moment().add(6, 'hours').unix(Number),
    channel_id: 2,
    episode_id: 5,
  },
  {
    start_time: moment().add(6, 'hours').unix(Number),
    end_time: moment().add(7, 'hours').unix(Number),
    channel_id: 2,
    episode_id: 6,
  },
  {
    start_time: moment().add(7, 'hours').unix(Number),
    end_time: moment().add(8, 'hours').unix(Number),
    channel_id: 2,
    episode_id: 7,
  },
  {
    start_time: moment().add(8, 'hours').unix(Number),
    end_time: moment().add(10, 'hours').unix(Number),
    channel_id: 2,
    episode_id: 8,
  },
  {
    start_time: moment().add(10, 'hours').unix(Number),
    end_time: moment().add(12, 'hours').unix(Number),
    channel_id: 2,
    episode_id: 18,
  },
  {
    start_time: moment().add(12, 'hours').unix(Number),
    end_time: moment().add(15, 'hours').unix(Number),
    channel_id: 2,
    episode_id: 19,
  },
  {
    start_time: moment().add(15, 'hours').unix(Number),
    end_time: moment().add(18, 'hours').unix(Number),
    channel_id: 2,
    episode_id: 11,
  },
  {
    start_time: moment().add(18, 'hours').unix(Number),
    end_time: moment().add(21, 'hours').unix(Number),
    channel_id: 2,
    episode_id: 12,
  },
  {
    start_time: moment().add(21, 'hours').unix(Number),
    end_time: moment().add(23, 'hours').unix(Number),
    channel_id: 2,
    episode_id: 6,
  },
  {
    start_time: moment().add(23, 'hours').unix(Number),
    end_time: moment().add(24, 'hours').unix(Number),
    channel_id: 2,
    episode_id: 14,
  },
  {
    start_time: moment().add(24, 'hours').unix(Number),
    end_time: moment().add(25, 'hours').unix(Number),
    channel_id: 2,
    episode_id: 13,
  },
  {
    start_time: moment().add(25, 'hours').unix(Number),
    end_time: moment().add(28, 'hours').unix(Number),
    channel_id: 2,
    episode_id: 1,
  },
  {
    start_time: moment().add(28, 'hours').unix(Number),
    end_time: moment().add(31, 'hours').unix(Number),
    channel_id: 2,
    episode_id: 17,
  },
  {
    start_time: moment().add(31, 'hours').unix(Number),
    end_time: moment().add(33, 'hours').unix(Number),
    channel_id: 2,
    episode_id: 9,
  },
  {
    start_time: moment().add(33, 'hours').unix(Number),
    end_time: moment().add(35, 'hours').unix(Number),
    channel_id: 2,
    episode_id: 10,
  },
];

module.exports = { feed };
