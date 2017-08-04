'use strict';

const seneca = require('seneca')();

// seneca.add('cmd:sum', (msg, respond) => {
//   let sum = Math.floor(msg.left) + Math.floor(msg.right);
//   respond(null, { answer: sum });
// });
// seneca.add('cmd:product', (msg, respond) => {
//   let product = msg.left * msg.right;
//   respond(null, { answer: product });
// });
// seneca.act({
//   cmd: 'sum',
//   left: 1.2,
//   right: 3.1,
//   integer: true
// }, (err, response) => {
//   if (err) {
//     console.error(err);
//   }
//   console.log(response.answer);
// }).act({
//   cmd: 'product',
//   left: 3,
//   right: 4
// }, (err, response) => {
//   if (err) {
//     console.error(err);
//   }
//   console.log(response.answer);
// });

seneca.add('role:math, cmd:sum', (msg, reply) => {
  let sum = msg.left + msg.right;
  reply(null, { answer: sum });
}).add('role:math, cmd:sum', function(msg, reply) {
  if (!Number.isFinite(msg.left) || !Number.isFinite(msg.right)) {
    return reply(new Error('left 与 right的值必须为数字！'));
  }
  // 调用上一个操作函数 role:math cmd:sum
  this.prior({
    role: 'math',
    cmd: 'sum',
    left: msg.left,
    right: msg.right,
  }, (err, result) => {
    if (err) {
      return reply(err);
    }
    result.info = `${msg.left} + ${msg.right}`;
    reply(null, result);
  });
}).act('role:math, cmd:sum, left: 1.5, right: 2.5', console.log);