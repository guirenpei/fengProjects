'use strict';
/* eslint no-console:0 */

const nodemailer = require('nodemailer');
const config = require('../../../config');

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport(config.netease);

// setup email data with unicode symbols
let mailOptions = {
  from: '"Fred Foo 👻" <page_princess@163.com>', // sender address
  to: '345521625@qq.com, 1446790681@qq.com', // list of receivers
  subject: 'Hello ✔', // Subject line
  text: 'Hello world ?', // plain text body
  html: '<b>Hello world ?</b>' // html body
};

// send mail with defined transport object
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    return console.log(error);
  }
  console.log('Message %s sent: %s', info.messageId, info.response);
});
