'use strict';
/* eslint no-console: 0 */

const _ = require('lodash');
const log = require('rainbowlog');

function myLength(arr) {
  if (_.isEmpty(arr)) {
    return 0;
  }
  return 1 + myLength(_.dropRight(arr));
}
log.trace('myLength(_.range(10))', myLength(_.range(10)));




































log.trace('end');
