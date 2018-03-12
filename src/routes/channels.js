const Router = require('koa-router');
const ctrl = require('../controllers').channels;

const router = new Router();
const BASE_URL = '/channels';

router.get(BASE_URL, ctrl.get);
router.get(`${BASE_URL}/programs/episodes`, ctrl.getProgramsWithEpisodes);
router.get(`${BASE_URL}/:channel_id/episodes`, ctrl.getEpisodes);
router.get(`${BASE_URL}/:channel_id/episodes/:episode_id`, ctrl.getEpisodesOne);
router.get(`${BASE_URL}/:channel_id/programs/episodes`, ctrl.getProgramsWithEpisodes);
router.get(`${BASE_URL}/:channel_id/programs/:program_id`, ctrl.getPrograms);
router.get(`${BASE_URL}/:channel_id/programs`, ctrl.getPrograms);
router.get(`${BASE_URL}/:id`, ctrl.getOne);
router.get(`${BASE_URL}/:id/feeds`, ctrl.getFeeds);

module.exports = router.routes();
