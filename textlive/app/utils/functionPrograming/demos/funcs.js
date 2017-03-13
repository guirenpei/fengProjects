'use strict';
/* eslint no-console: 0 */

const _ = require('lodash');
const log = require('rainbowlog');

const library = [
  {
    title: 'SICP',
    isbn: '0262010771',
    ed: 1,
  },
  {
    title: 'SICP',
    isbn: '0262510871',
    ed: 2,
  },
  {
    title: 'Joy for Clojure',
    isbn: '1935182641',
    ed: 1,
  },
];
const project = (table, keys) => {
  return _.map(table, (obj) => _.pick.apply(null, construct(obj, keys)));
};
const object1 = _.pick(library, ['title']);
log.trace('object1', object1);
