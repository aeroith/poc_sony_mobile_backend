const Router = require('koa-router');
const queries = require('../db/queries/programs');

const router = new Router();
const BASE_URL = '/api/v1/programs';

router.get(BASE_URL, async (ctx) => {
  try {
    const programs = await queries.getAllPrograms();
    ctx.body = {
      status: 'success',
      data: programs,
    };
  } catch (err) {
    console.log(err);
  }
})

router.get(`${BASE_URL}/:id`, async (ctx) => {
  try {
    const program = await queries.getSingleProgram(ctx.params.id);
    if (program.length) {
      ctx.body = {
        status: 'success',
        data: program,
      };
    } else {
      ctx.status = 404;
      ctx.body = {
        status: 'error',
        message: 'That program does not exist.',
      };
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
