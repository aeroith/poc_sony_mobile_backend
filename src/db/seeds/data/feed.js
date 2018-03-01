const moment = require('moment');

const feed = [
  {
    start_time: moment().unix(Number),
    end_time: moment().add(1, 'hours').unix(Number),
    channel_id: 1,
    episode_id: 1,
  },
  {
    start_time: moment().unix(Number),
    end_time: moment().add(1, 'hours').unix(Number),
    channel_id: 2,
    episode_id: 1,
  },
  {
    start_time: moment().unix(Number),
    end_time: moment().add(1, 'hours').unix(Number),
    channel_id: 3,
    episode_id: 1,
  },
  {
    start_time: moment().add(1, 'hours').unix(Number),
    end_time: moment().add(2, 'hours').unix(Number),
    channel_id: 1,
    episode_id: 2,
  },
  {
    start_time: moment().add(1, 'hours').unix(Number),
    end_time: moment().add(2, 'hours').unix(Number),
    channel_id: 2,
    episode_id: 2,
  },
  {
    start_time: moment().add(1, 'hours').unix(Number),
    end_time: moment().add(2, 'hours').unix(Number),
    channel_id: 3,
    episode_id: 2,
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
    channel_id: 2,
    episode_id: 3,
  },
  {
    start_time: moment().add(2, 'hours').unix(Number),
    end_time: moment().add(3, 'hours').unix(Number),
    channel_id: 3,
    episode_id: 3,
  },
  {
    start_time: moment().add(3, 'hours').unix(Number),
    end_time: moment().add(4, 'hours').unix(Number),
    channel_id: 1,
    episode_id: 4,
  },
  {
    start_time: moment().add(3, 'hours').unix(Number),
    end_time: moment().add(4, 'hours').unix(Number),
    channel_id: 2,
    episode_id: 4,
  },
  {
    start_time: moment().add(3, 'hours').unix(Number),
    end_time: moment().add(4, 'hours').unix(Number),
    channel_id: 3,
    episode_id: 4,
  },
];

module.exports = { feed };
