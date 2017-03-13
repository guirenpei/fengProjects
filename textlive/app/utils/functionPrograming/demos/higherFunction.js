'use strict';
/* eslint no-console: 0 */

const _ = require('lodash');
const log = require('rainbowlog');

function repeat(times, value) {
  return _.map(_.range(times), () => value);
}

log.trace('repeat(4, "feng")', repeat(4, 'feng'));

function iterateUtil(func, check, init) {
  let ret = [];
  let result = func(init);
  while (check(result)) {
    ret.push(result);
    result = func(init);
  }
  return ret;
}

// log.trace('iterateUtil(func, check, util)', iterateUtil(function(n) { return n + n; }, function(n) { return n <= 1024; }, 1));

function uniqueString(len) {
  return Math.random().toString(2).substr(2, len);
}

log.trace('uniqueString(10)', uniqueString(10));

// 声称特定前缀的唯一字符串

function uniqueStringWithPrefix(prefix) {
  return [prefix, new Date().getTime()].join('');
}

log.trace('uniqueStringWithPrefix(fengfeng)', uniqueStringWithPrefix('fengfeng'));

// 使用闭包来捕获增加值

function makeUniqueStringFunction(start) {
  let counter = start;
  return (prefix) => [prefix, counter++].join('');
}

const uniqueStringStart = makeUniqueStringFunction(5);

log.trace('uniqueStringStart(ye)', uniqueStringStart('ye'));
log.trace('uniqueStringStart(feng)', uniqueStringStart('feng'));

const omgenerator = (function(init) {
  let counter = init;
  return {
    uniqueString: (prefix) => [prefix, counter++].join('')
  };
})(0);

log.trace('omgenerator(xutengfeng)', omgenerator.uniqueString('xutengfeng'));
log.trace('omgenerator(yeweimi)', omgenerator.uniqueString('yeweimi'));




































log.trace('end');
