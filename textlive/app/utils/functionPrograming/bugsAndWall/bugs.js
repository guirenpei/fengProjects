'use strict';

function StupidBug() {}
StupidBug.prototype.act = (surrounding) => { return {type: 'move', direction: 's'}; };

function BouncingBug() {
  this.direction = 'ne';
}

BouncingBug.prototype.act = function(surrounding) {
  if (surrounding[this.direction] !== ' ') {
    this.direction = (this.direction === 'ne' ? 'sw' : 'ne');
  }
  return {type: 'move', direction: this.direction};
};

function DrunkBug() {}

module.exports = {BouncingBug, StupidBug, DrunkBug};
