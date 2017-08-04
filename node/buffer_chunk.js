'use strict';

const request = require('request');
const log = require('rainbowlog');

const urlpath = 'http://www.23wx.so/7_7147/5623469.html';

(async () => {
  let chunks = [];
  let size = 0;
  request(urlpath)
    .on('data', (chunk) => {
      chunks.push(chunk);
      size += chunk.length;
    })
    .on('error', (err) => {
      if (err) {
        log.error(err.stack || err);
      }
    })
    .on('end', (end) => {
      let data = null;
      switch (chunks.length) {
        case 0:
          data = new Buffer(0);
          break;
        case 1:
          data = chunks[0];
          break;
        default:
          data = new Buffer(size);
          for (let i = 0, pos = 0, l = chunks.length; i < l; i += 1) {
            let chunk = chunks[i];
            chunk.copy(data, pos);
            pos += chunk.length;
          }
          break;
      }
      log.trace('data', data.toString('utf-8'));
      log.trace('end', end);
    })
    .on('finish', (finish) => {
      log.trace('finish', finish);
    });
})();