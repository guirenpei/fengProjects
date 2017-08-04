'use strict';

/* eslint camelcase: 0 */
// 一个method方法去定义新方法
Function.prototype.method = function(name, func) {
  this.prototype[name] = func;
  return this;
};
// 一个检测对象是否为数组的方法
let obj1 = {};
let obj2 = [];
const is_array = function(value) {
  return value
    && typeof value === 'object'
    // && value.constructor === Array;
    // 当只用上述判断的时候，在识别不同的窗口（window）或帧（frame）
    // 里面构造的数组时会失败。所以要做更多的工作
    && typeof value.length === 'number'
    && typeof value.splice === 'function'
    && !(value.propertyIsEnumerable('length'));
};
console.log('obj1', is_array(obj1));
console.log('obj2', is_array(obj2));

Array.method('reduce', function(f, value) {
  let i;
  for (i = 0; i < this.length; i += 1) {
    value = f(this[i], value);
  }
  return value;
});

let data = [4, 8, 15, 16, 23, 42];
const add = (a, b) => a + b;
const mult = (a, b) => a * b;
let sum = data.reduce(add, 0);
console.log('sum', sum);
const product = data.reduce(mult, 1);
console.log('product', product);

data.total = function() {
  return this.reduce(add, 0);
};
let total = data.total();
console.log('total', total);
