'use strict';
/* eslint no-console: 0 */

const _ = require('underscore');

function Point2D(x, y) {
  this._x = x;
  this._y = y;
}
function Point3D(x, y, z) {
  Point2D.apply(this, [x, y]);
  this._z = z;
}
console.log(new Point3D(1, 2, 3));
