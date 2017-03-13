'use strict';

const Mailer = require('./mailer');
const moment = require('moment');

const hour = 3600 * 1000;

// 控制发送邮件报告
module.exports = class Reporter {

  // 传入网站名和整合后的配置
  constructor(site, config) {
    this.site = site;
    this.mailer = new Mailer(config);
    // 定期报告频率
    this.regularInterval = config.regularReportInterval || 2 * hour; // default as 2h.
    // 一般报告频率
    this.reportInterval = config.reportInterval || 1 * hour; // default as 1h

    this.lastRegularReport = Date.now();
    this.lastReport = new Map();
  }

  // 发送定期报告（自带频率限制，可作死调用）
  *regularReport() {
    const hour = moment().hour();
    if (hour < 10 || hour > 18) { return false; }
    if (Date.now() - this.lastRegularReport > this.regularInterval) {
      this.lastRegularReport = Date.now();
      const subject = `[${this.site.toUpperCase()} OBSERVER] REGULAR REPORT ${moment().format('YYYY-MM-DD HH:mm')}`;
      const dashboard = makeTable(
        ['Key', 'Value'],
        Array.from((yield this.meta.dashboard()).entries())
      );

      const markdown = [
        makeTitle(2, 'Dashboard'),
        dashboard,
      ].join('\n\n');

      this.mailer.sendMarkdown(subject, markdown);
      return true;
    }
    return false;
  }

  // 发送一般报告（自带根据标题的频率限制，标题要按类型固定，可作死调用）
  report(title, content, customInterval) {
    const lastReport = this.lastReport.get(title) || 0;
    const hour = moment().hour();
    if (hour < 10 || hour > 18) { return false; }
    if (Date.now() - lastReport > (customInterval || this.reportInterval)) {
      this.lastReport.set(title, Date.now());
      const subject = `[${this.site.toUpperCase()} OBSERVER] REPORT: ${title}`;

      this.mailer.sendText(subject, content);
      return true;
    }
    return false;
  }

  reportWithAttach(content, attachments) {
    const subject = `${this.site.toUpperCase()} ERROR AND CHANGED HTML IN LAST HOUR`;
    this.mailer.sendTextWithAttach(subject, content, attachments);
    return true;
  }
};

// 格式化Markdown标题
function makeTitle(level, text) {
  return `${Array(level).fill('#').join('')} ${text}`;
}

// 格式化Markdown表格
function makeTable(columns, rows) {
  return [
    columns,
    columns.map(() => '----'),
  ].concat(rows).map(row =>
    columns.map((c, i) => row[i]).join(' | ')
  ).map(row => `| ${row} |`).join('\n');
}
