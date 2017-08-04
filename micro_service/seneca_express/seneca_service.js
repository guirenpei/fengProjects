'use strict';
const seneca = require('seneca')();
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
  .use('api')
  .client({ type: 'tcp', pin: 'role:math' });
// seneca.use(senecaWeb, {s
//   context: Express(),
//   adapter: require('seneca-web-adapter-express')
// });
// seneca.ready(() => {
//   const app = seneca.export('web/context')();
//   app.listen(9191);
// });
// app.use(seneca.export('web/context')());
// app.listen(9191);

