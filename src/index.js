const Koa = require('koa');
const responseTime = require('koa-response-time');
const helmet = require('koa-helmet');
const logger = require('koa-logger');
require('dotenv').config();

const { server: { port } } = require('./config');
const config = require('./config');
const routes = require('./routes');

const app = new Koa();

if (!config.env.isTest) {
  app.use(responseTime());
  app.use(helmet());
}

app.use(logger());
app.use(routes.routes());
app.use(routes.allowedMethods());

const server = app.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});

// capture signal 2 on nodemon subprocess to gracefully restart server
// if (!config.env.isProd) {
//   process.on('SIGUSR2', () => { process.exit(0); });
// }
module.exports = server;
