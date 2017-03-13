'use strict';
/* eslint no-console: 0 */
const Point = require('./point');
const func = require('../lib/funcs');
function Dictionary(startValues) {
  this.values = startValues || {};
}
Dictionary.prototype.store = function(name, value) {
  this.values[name] = value;
};

Dictionary.prototype.lookup = function(name) {
  return this.values[name];
};

Dictionary.prototype.contains = function(name) {
  return Object.prototype.propertyIsEnumerable.call(this.values, name);// 是用来检测属性是否属于某个对象的,如果检测到了,返回true,否则返回false
};

Dictionary.prototype.each = function(action) {
  func.forEachIn(this.values, action);
};

Dictionary.prototype.names = function() {
  let names = [];
  this.each((name, value) => names.push(name));
  return names;
};

const directions = new Dictionary({
  'n': new Point(0, -1),
  'ne': new Point(1, -1),
  'e': new Point(1, 0),
  'se': new Point(1, 1),
  's': new Point(0, 1),
  'sw': new Point(-1, 1),
  'w': new Point(-1, 0),
  'nw': new Point(-1, -1),
});
module.exports = {Dictionary, directions};
