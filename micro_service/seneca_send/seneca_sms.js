'use strict';

module.exports = function(options) {
  let init = {};
  /**
   * 发送短信
   * @param {String} destination 发送对象
   * @param {String} content 发送内容
   */
  init.sendSMS = (destination, content) => {

  };
  /**
   * 读取未读短信列表
   */
  init.readPendingSMS = () => {
    
    let listOfSms = [];
    return listOfSms;
  };
  /**
   * 发送邮件
   * @param {String} subject 主题
   * @param {String} content 邮件内容
   */
  init.sendEmail = () => {

  };
  /**
   * 读取未读邮件列表
   */
  init.readPendingEmails = () => {
    let listOfEmails = [];
    return listOfEmails;
  };
  /**
   * 这段代码将已读邮件打上标记，这样他们就不会被
   * readPendingEmails函数重复读取
   * @param {Number} messageId 邮件id
   */
  init.markEmailAsRead = (messageId) => {

  };
  /**
   * 这个函数将待印刷及邮寄的文件放入队列中
   * @param {Array} document 要印刷以及邮寄的文件
   */
  init.queuePost = (document) => {

  };
  return init;
};