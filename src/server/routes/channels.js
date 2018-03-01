const Router = require('koa-router');
const queries = require('../db/queries/channels');

const router = new Router();
const BASE_URL = '/api/v1/channels';

router.get(BASE_URL, async (ctx) => {
  try {
    const channels = await queries.getAllChannels();
    ctx.body = {
      status: 'success',
      data: channels,
    };
  } catch (err) {
    console.log(err);
  }
});

router.get(`${BASE_URL}/:id`, async (ctx) => {
  try {
    const channel = await queries.getSingleChannel(ctx.params.id);
    if (channel.length) {
      ctx.body = {
        status: 'success',
        data: channel,
      };
    } else {
      ctx.status = 404;
      ctx.body = {
        status: 'error',
        message: 'That channel does not exist.',
      };
    }
  } catch (err) {
    console.log(err);
  }
});

router.get(`${BASE_URL}/:id/feeds`, async (ctx) => {
  try {
    const { startTime, endTime } = ctx.query;
    const feed = await queries.getFeedFromChannel(ctx.params.id, startTime, endTime);
    if (feed.length) {
      ctx.body = {
        status: 'success',
        data: feed,
      };
    } else {
      ctx.status = 404;
      ctx.body = {
        status: 'error',
        message: 'There are no feed data between the given interval',
      };
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
