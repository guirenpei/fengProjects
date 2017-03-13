'use strict';

const Point = require('./point');

function Grid(width, height) {
  this.width = width;
  this.height = height;
  this.cells = new Array(width * height);
}

Grid.prototype.valueAt = function(point) {
  return this.cells[point.y * this.width + point.x];
};

Grid.prototype.setValueAt = function(point, value) {
  this.cells[point.y * this.width + point.x] = value;
};

Grid.prototype.isInside = function(point) {
  return point.x >= 0 && point.y >= 0 && point.x < this.width && point.y < this.height;
};

Grid.prototype.moveValue = function(from, to) {
  this.setValueAt(to, this.valueAt(from));
  this.setValueAt(from, undefined);
};

Grid.prototype.each = function(action) {
  for (let y = 0; y < this.height; y++) {
    for (let x = 0; x < this.width; x++) {
      let point = new Point(x, y);
      action(point, this.valueAt(point));
    }
  }
};
module.exports = Grid;
