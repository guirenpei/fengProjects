'use strict';
const seneca = require('seneca')();
// const item = require('./item');
seneca.use('entity').use('item');
seneca.use('mongo-store', {
  name: 'seneca',
  host: '127.0.0.1',
  port: '27017',
});
seneca.ready((err) => {
  seneca.act('role:web', {
    use: {
      prefix: '/products',
      pin: { area: 'product', action: '*' },
      map: {
        fetch: {
          GET: true
        },
        edit: {
          GET: false,
          POST: true,
        },
        delete: {
          GET: false,
          DELETE: true,
        },
      },
    },
  });
});

const senecaWeb = require('seneca-web');
const Express = require('express');
let Router = Express.Router;
let context = new Router();
let senecaWebConfig = {
  context: context,
  adapter: require('seneca-web-adapter-express'),
  options: { parseBody: false } // so we can use body-parser
};
const app = Express()
      .use(require('body-parser').json())
      .use(context)
      .listen(9191);
seneca.use(senecaWeb, senecaWebConfig)
  .client({ type: 'tcp', pin: 'role:math' });

