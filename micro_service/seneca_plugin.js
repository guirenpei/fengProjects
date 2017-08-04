'use strict';

const seneca = require('seneca')();

// const minimal_plugin = (options) => {
//   console.log(options);
// };
// seneca.use(minimal_plugin, { foo: 'bar' });
function math(options) {
  this.add('role:math, cmd:sum', (msg, reply) => {
    reply(null, { answer: msg.left + msg.right });
  });
  this.add('role:math, cmd:product', (msg, reply) => {
    reply(null, { answer: msg.left * msg.right });
  });
}
seneca.use(math).act('role:math, cmd:sum, left:1, right: 2', console.log);