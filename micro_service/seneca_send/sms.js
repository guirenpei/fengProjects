'use strict';

module.exports = function(options) {
  /**
   * 发送短信
   */
  this.add('channel: sms, action: send', (msg, reply) => {
    reply(null, { sms: '发送成功' });
  });
  /**
   * 获取未读短信
   */
  this.add('channel: sms, action: pending', (msg, reply) => {
    reply(null, { smsList: '获取未读短信列表' });
  });
};