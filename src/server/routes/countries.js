const Router = require('koa-router');
const ctrl = require('../controllers').countries;

const router = new Router();
const BASE_URL = '/countries';

router.get(BASE_URL, ctrl.get);

module.exports = router.routes();
