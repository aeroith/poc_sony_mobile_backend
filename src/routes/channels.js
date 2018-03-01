const Router = require('koa-router');
const ctrl = require('../controllers').channels;

const router = new Router();
const BASE_URL = '/channels';

router.get(BASE_URL, ctrl.get);

router.get(`${BASE_URL}/:id`, ctrl.getOne);

router.get(`${BASE_URL}/:id/feeds`, ctrl.getFeeds);

module.exports = router.routes();
