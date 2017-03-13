'use strict';

const nodemailer = require('nodemailer');
const markdown = require('nodemailer-markdown').markdown;
const at = require('lodash/at');

module.exports = class Mailer {

  constructor(config) {
    this.transporter = nodemailer.createTransport(config.netease);
    this.transporter.use('compile', markdown());
    this.from = config.sender || at(config, 'mailer.auth.user')[0];
    this.to = [].concat(config.developer, config.subscriber);
  }

  sendMarkdown(subject, md) {
    this.transporter.sendMail({
      from: this.from,
      to: this.to,
      subject: subject,
      markdown: md,
    });
  }

  sendText(subject, text) {
    this.transporter.sendMail({
      from: this.from,
      to: this.to,
      subject: subject,
      text: text,
    });
  }

  sendHTML(subject, html) {
    this.transporter.sendMail({
      from: this.from,
      to: this.to,
      subject: subject,
      html: html,
    });
  }

  sendMarkdownWithAttach(subject, md, attachments) {
    this.transporter.sendMail({
      from: this.from,
      to: this.to,
      subject: subject,
      markdown: md,
      attachments,
    });
  }

  sendTextWithAttach(subject, text, attachments) {
    this.transporter.sendMail({
      from: this.from,
      to: this.to,
      subject: subject,
      text: text,
      attachments,
    });
  }

};
