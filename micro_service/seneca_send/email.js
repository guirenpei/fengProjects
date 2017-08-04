'use strict';

module.exports = function(options) {
  /**
   * 发送邮件
   */
  this.add('channel: email, action: send', (msg, reply) => {
    reply(null, { message: '成功发送邮件' });
  });
  /**
   * 获取未读邮件列表
   */
  this.add('channel: email, action: pending', (msg, reply) => {
    reply(null, { emailList: ['haha'] });
  });
  /**
   * 将消息标记为已读
   */
  this.add('channel: email, action: read', (mesg, reply) => {
    reply(null, { read: '标记已读' });
  });
};