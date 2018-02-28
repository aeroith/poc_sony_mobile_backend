const moment = require('moment');
const feed = [
  {
    start_time: moment().toISOString(),
    end_time: moment().add(1, 'hours').toISOString(),
    channel: 1,
    program: 1,
  },
  {
    start_time: moment().toISOString(),
    end_time: moment().add(1, 'hours').toISOString(),
    channel: 2,
    program: 1,
  },
  {
    start_time: moment().toISOString(),
    end_time: moment().add(1, 'hours').toISOString(),
    channel: 3,
    program: 1,
  },
  {
    start_time: moment().add(1, 'hours').toISOString(),
    end_time: moment().add(2, 'hours').toISOString(),
    channel: 1,
    program: 2,
  },
  {
    start_time: moment().add(1, 'hours').toISOString(),
    end_time: moment().add(2, 'hours').toISOString(),
    channel: 2,
    program: 2,
  },
  {
    start_time: moment().add(1, 'hours').toISOString(),
    end_time: moment().add(2, 'hours').toISOString(),
    channel: 3,
    program: 2,
  },
  {
    start_time: moment().add(2, 'hours').toISOString(),
    end_time: moment().add(3, 'hours').toISOString(),
    channel: 1,
    program: 3,
  },
  {
    start_time: moment().add(2, 'hours').toISOString(),
    end_time: moment().add(3, 'hours').toISOString(),
    channel: 2,
    program: 3,
  },
  {
    start_time: moment().add(2, 'hours').toISOString(),
    end_time: moment().add(3, 'hours').toISOString(),
    channel: 3,
    program: 3,
  },
];

module.exports = { feed };