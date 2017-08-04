'use strict';

module.exports = function math(options) {
  this.add('role:math, cmd:sum', (msg, reply) => {
    reply(null, { answer: msg.left + msg.right });
  });
  this.add('role:math, cmd:product', (msg, reply) => {
    reply(null, { answer: msg.left * msg.right });
  });
  /**
   * seneca.wrap 可以匹配一组模式
   * 使用相同的动作扩展函数覆盖至所有被匹配的模式
   * 这与为每一个组模式手动调用seneca去扩展可以得到一样的效果
   * 它需要两个参数
   * 1.pin: 模式匹配模式
   * 2.action: 扩展的action函数
   * pin 是一个可以匹配到多个模式的模式，
   * 它可以匹配到多个模式，比如role:math
   * 这个pin可以匹配到
   * role: math, cmd: sum 与
   * role: math, cmd: product
   * 下面的示例示确保了，任何传递给role:math 的消息体中left与right
   * 值都是数字，即使我们传递了字符串，也可以被自动地转换为数字
   */
  this.wrap('role:math', function(msg, reply) {
    msg.left = Number(msg.left).valueOf();
    msg.right = Number(msg.right).valueOf();
    this.prior(msg, reply);
  });
};
/**
 * 有时候查看seneca实例中有哪些操作时被重写了是很有用的，可以在启动
 * 应用时加上 --seneca.print.tree 参数即可
 */