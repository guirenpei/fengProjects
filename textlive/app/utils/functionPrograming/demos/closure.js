'use strict';
/* eslint no-console: 0 */

const _ = require('lodash');
const log = require('rainbowlog');

// 最简单的闭包例子
function whatWasTheLocal() {
  const name = 'xutengfeng';
  return () => `The local was ${name}`;
}
log.trace(whatWasTheLocal());
const reporteLocal = whatWasTheLocal();

log.trace(reporteLocal());

function createScaleFunction(factor) {
  return (v) => _.map(v, (n) => n * factor);
}

const scale10 = createScaleFunction(10);

log.trace('scale10', scale10([1, 2, 3]));

function createWeirdScaleFunction(factor) {
  return function(v) {
    this['factor'] = factor;
    const captures = this;
    log.trace('captures', captures);
    return _.map(v, _.bind(function(n) {
      return (n * this['factor']);
    }, captures));
  };
}

const scale15 = createWeirdScaleFunction(15);

log.trace('scale15', scale15.call({}, [1, 2, 3]));


function complement(pred) {
  return function() {
    return !pred.apply(null, _.toArray(arguments));
  };
}

let isEven = (n) => (n % 2) === 0;
const isOdd = complement(isEven);
log.trace('isOdd(2)', isOdd(2));
log.trace('isOdd(3)', isOdd(3));

isEven = (n) => false;
log.trace('isEven(10)', isEven(10));
log.trace('isOdd(12)', isOdd(12));
log.trace('isOdd(13)', isOdd(13));

function showObject(obj) {
  return function() {
    return obj;
  };
}

const o = {a: 42};
const showO = showObject(o);

log.trace('showO()', showO());

o.newField = 108;
log.trace('showO() o.newField ', showO());
log.error('由于o的引用同时存在于闭包内部和外部，它的变化可以跨越看似私有的界限。' +
'这很容易导致混乱，所以通常的使用情况是最大限度地减少暴露的风险。Javascript通常使用下面这种模式，把捕获的变量作为私有变量！');
const pingpong = (function() {
  let privates = 0;
  return {
    inc: (n) => privates += n,
    dec: (n) => privates -= n,
  };
})();

log.trace('pingpong', pingpong.inc(10));
log.trace('pingpong', pingpong.dec(7));

function plucker(field) {
  return (obj) => obj && obj[field];
}

const best = {name: 'xutengfeng', do: 'will', what: 'love', to: 'yemimi'};

const getName = plucker('to');
log.trace('getName(best)', getName(best));



































log.trace('end');
