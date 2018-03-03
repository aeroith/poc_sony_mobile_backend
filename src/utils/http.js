const _ = require('lodash');

const http = {};

http.ok = (ctx, data) => {
  if (data && !_.isEmpty(data)) {
    ctx.body = {
      status: 'success',
      data,
    };
  } else {
    ctx.status = 404;
    ctx.body = {
      status: 'error',
      message: 'Not found.',
    };
  }
};

http.internalServerError = (ctx, err) => {
  console.log(err);
  ctx.status = 500;
  ctx.body = {
    status: 'error',
    message: 'Internal Server Error',
  };
};

module.exports = http;
