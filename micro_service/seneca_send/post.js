'use strict';

module.exports = function(options) {
  /**
   * 将待打印、邮寄的信息放入队列
   */
  this.add('channel: post, action: queue', (msg, reply) => {
    reply(null, { postQueue: '成功将信息放入队列' });
  });
};