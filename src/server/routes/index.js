const Router = require('koa-router');

const program = require('./programs');
const channel = require('./channels');
const country = require('./countries');

const router = new Router();
const api = new Router();

api.use(program);
api.use(channel);
api.use(country);

router.use('/api/v1', api.routes());

module.exports = router;
