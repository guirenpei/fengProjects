'use strict';
/**
 * seneca 不是一个web框架。但是仍然需要将其连接到web服务API
 * 永远记住，不要将内部行为模式暴露在外面，这不是一个好的安全的实践
 * 相反的，应该定义一组API模式，比如用属性role:api
 * 然后就可以将它们连接到内部微服务
 */
module.exports = function api(options) {
  let validOps = { sum: 'sum', product: 'product' };
  this.add('role:api, path: calculate', function(msg, reply) {
    let operation = msg.args.params.operation;
    let left = msg.args.query.left;
    let right = msg.args.query.right;
    this.act('role:math', {
      cmd: validOps[operation],
      left,
      right,
    }, reply);
  });
  this.add('init:api', function(msg, reply) {
    this.act('role:web', {
      routes: {
        prefix: '/api',
        pin: 'role:api, path: *',
        map: {
          calculate: {
            GET: true,
            suffix: '/{operation}'
          }
        }
      }
    }, reply);
  });
};