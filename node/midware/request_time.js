'use strict';

const log = require('rainbowlog');
/**
 * 请求时间中间件
 * 选项
 * @param {Object} options
 * @api public
 */
module.exports = (opts) => {
  let time = opts.time || 100;
  return (req, res, next) => {
    let timer = setTimeout(() => {
      log.warn(` ${req.method} ${req.url} is taking too long`);
    }, time);
    let end = res.end;
    res.end = (chunk, encoding) => {
      res.end = end;
      res.end(chunk, encoding);
      clearTimeout(timer);
    };
    next();
  };
};