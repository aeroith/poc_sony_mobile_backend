const Router = require('koa-router');
const ctrl = require('../controllers').episodes;

const router = new Router();
const BASE_URL = '/episodes';

router.get(BASE_URL, ctrl.get);
router.get(`${BASE_URL}/:id`, ctrl.getOne);

module.exports = router.routes();
