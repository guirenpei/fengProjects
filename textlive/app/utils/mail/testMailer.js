'use strict';
/* eslint no-console:0 */

// const co = require('co');
// const fs = require('fs-extra');
const Reporter = require('./reporter');

const config = require('../../../config.db');
const reporter = new Reporter('fengfeng', config);

const xlsx = require('node-xlsx').default;
const moment = require('moment');
// const path = require('path');
// ['title', 'content', 'url', 'log', 'result', 'isArticle', 'code', 'type', 'site']

function sendTestMailWithXlsx() {
  let sheets = [];
  sheets.push({
    name: 'ERROR',
    data: [
      ['errortitle1', 'errorcontent1', 'errorurl1', 'errorlog1', 'errorresult1', 'errorisArticle1', 'errorcode1', 'errortype1', 'errorsite1'],
      ['errortitle2', 'errorcontent2', 'errorurl2', 'errorlog2', 'errorresult2', 'errorisArticle2', 'errorcode2', 'errortype2', 'errorsite2'],
    ],
  });
  sheets.push({
    name: 'SAME',
    data: [
      ['sametitle1', 'samecontent1', 'sameurl1', 'samelog1', 'sameresult1', 'sameisArticle1', 'samecode1', 'sametype1', 'samesite1'],
      ['sametitle2', 'samecontent2', 'sameurl2', 'samelog2', 'sameresult2', 'sameisArticle2', 'samecode2', 'sametype2', 'samesite2'],
    ],
  });
  sheets.push({
    name: 'UPDATE',
    data: [
      ['updatetitle1', 'updatecontent1', 'updateurl1', 'updatelog1', 'updateresult1', 'updateisArticle1', 'updatecode1', 'updatetype1', 'updatesite1'],
      ['updatetitle2', 'updatecontent2', 'updateurl2', 'updatelog2', 'updateresult2', 'updateisArticle2', 'updatecode2', 'updatetype2', 'updatesite2'],
    ],
  });
  sheets.push({
    name: 'INSERT',
    data: [
      ['inserttitle1', 'insertcontent1', 'inserturl1', 'insertlog1', 'insertresult1', 'insertisArticle1', 'insertcode1', 'inserttype1', 'insertsite1'],
      ['inserttitle2', 'insertcontent2', 'inserturl2', 'insertlog2', 'insertresult2', 'insertisArticle2', 'insertcode2', 'inserttype2', 'insertsite2'],
    ],
  });
  let attachments = [];
  const contentBuffer = createXlsxBuffer(sheets);
  const time = moment(new Date()).format('YYYY/MM/DD');
  attachments.push({
    filename: `${time}.xlsx`,
    content: contentBuffer,
  });
  let errorCount = 0;
  let updateCount = 0;
  let insertCount = 0;
  for (const sheet of sheets) {
    if (sheet.name === 'ERROR') {
      errorCount = sheet.data && sheet.data.length;
    }
    if (sheet.name === 'UPDATE') {
      updateCount = sheet.data && sheet.data.length;
    }
    if (sheet.name === 'INSERT') {
      insertCount = sheet.data && sheet.data.length;
    }
  }
  const content = `${errorCount}项ERROR被发现\r\n${updateCount}项UPDATE被发现\r\n${insertCount}项INSERT被发现\r\n`;
  reporter.reportWithAttach(content, attachments);
}

/*
  sheets [map]
*/
function createXlsxBuffer(sheets) {
  let template = ['title', 'content', 'url', 'log', 'result', 'isArticle', 'code', 'type', 'site'];
  let bufferAdded = [];
  for (const sheet of sheets) {
    const dataArr = [];
    dataArr.push(template);
    for (const data of sheet.data) {
      dataArr.push(data);
    }
    bufferAdded.push({name: sheet.name, data: dataArr});
  }
  // const data = [[1, 2, 3], [true, false, null, 'sheetjs'], ['foo', 'bar', new Date('2014-02-19T14:30Z'), '0.3'], ['baz', null, 'qux']];
  return xlsx.build(bufferAdded); // Returns a buffer
  // fs.writeFileSync(path.join(__dirname, 'firstSheetName.xlsx'), buffer, 'utf-8');
}

// createXlsx();

try {
  sendTestMailWithXlsx();
} catch (e) {
  console.log(e.stack || e);
}
