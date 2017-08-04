'use strict';

const seneca = require('seneca')();

seneca
  .use('email')
  .use('sms')
  .use('post')
  .listen({ port: 1932 });