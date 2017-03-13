'use strict';
/* eslint no-console: 0 */

const _ = require('underscore');

const nums = [1, 2, 3, 4, 5];

const doubleAll = (array) =>{
  return _.map(array, (n) => n * 2);
};
console.log(doubleAll(nums));

const average = (array) => {
  const sum = _.reduce(array, (a, b) => a + b);
  return sum / _.size(array);
};
console.log(average(nums));

const onlyEven = (array) => {
  return _.filter(array, (num) => num % 2 === 0);
};
console.log(onlyEven(nums));
