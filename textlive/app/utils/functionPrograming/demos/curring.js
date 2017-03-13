'use strict';
/* eslint no-console: 0 */

const _ = require('lodash');
const log = require('rainbowlog');

// 柯里化函数为每一个逻辑参数返回一个新函数
function rightAwayInvoker() {
  const args = _.toArray(arguments);
  log.trace('args', args);
  const method = args.shift();
  log.trace('method', method);
  const target = args.shift();
  log.trace('target', target);
  log.trace('args', args);
  return method.apply(target, args);
}
log.trace('rightAwayInvoker(Array.prototype.reverse, [1,2,3])', rightAwayInvoker(Array.prototype.reverse, [1, 2, 3]));

// 这是一个简单的高阶函数，它接受一个函数，并返回只接收一个参数的函数
function curry(func) {
  return (arg) => func(arg);
}

/*
  在一些版本的Javascript中，给array#map中的函数提供的参数包括数组元素，元素索引，以及数组本身。
  因此吊桶parseInt时传入的基数参数将会依次为0，1，2，然后是3.
  如果使用curry，就可以强制parseInt在每次调用的时候只接受一个参数
*/
log.trace(`['11', '${11}', '11', '11'].map(parseInt)`, ['11', '11', '11', '11'].map(parseInt));
log.trace(`['11', '${11}', '11', '11'].map(curry(parseInt))`, ['11', '11', '11', '11'].map(curry(parseInt)));
// 一次柯里化两个参数
function curry2(func) {
  return (secondArg) => (firstArg) => func(firstArg, secondArg);
}

function div(n, d) { return n / d; }
const div10 = curry2(div)(10);

log.trace('div10', div10(50));

// curry2 还可用于固化parseInt的行为，使其解析时只处理二进制数
const parseBinaryString = curry2(parseInt)(2);

log.trace('parseBinaryString(111)', parseBinaryString('111'));

/*
  使用柯里化构建新函数
*/
const plays = [
  {
    artist: 'Burial',
    track: 'Archangel',
  },
  {
    artist: 'Ben Frost',
    track: 'Stomp',
  },
  {
    artist: 'Ben Frost',
    track: 'Stomp',
  },
  {
    artist: 'Burial',
    track: 'Archangel',
  },
  {
    artist: 'Emeralds',
    track: 'Snores',
  },
  {
    artist: 'Burial',
    track: 'Archangel',
  },
];

function songToString(song) {
  return [song.artist, song.track].join(' - ');
}

const songCount = curry2(_.countBy)(songToString);
log.trace('curry2(_.countBy)(songToString)', songCount(plays));

// 柯里化三个参数来实现HTML十六进制颜色构建器

function curry3(func) {
  return (last) => (middle) => (first) => func(first, middle, last);
}

const songPlays = curry3(_.uniqWith)(songToString)(_.isEqual);
log.trace('curry3(_.uniqWith)(songToString)(_.isEqual)', songPlays(plays));
log.trace('_.uniqWith(plays, _.isEqual, songToString)', _.uniqWith(plays, _.isEqual));

function toHex(n) {
  const hex = n.toString(16);
  return (hex.length < 2) ? [0, hex].join('') : hex;
}

function rgbToHexString(r, g, b) {
  return ['#', toHex(r), toHex(g), toHex(b)].join('');
}
log.trace('rgbToHexString(255,255,255)', rgbToHexString(255, 255, 255));

const blueGreenish = curry3(rgbToHexString)(255)(200);

log.trace('curry3(rgbToHexString)(255)(200)', blueGreenish(0));


























log.trace('end');
