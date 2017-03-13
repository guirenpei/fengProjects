'use strict';
const func = require('./lib/funcs');
const log = require('rainbowlog');
const {directions} = require('./dictionary');

function Lichen() {
  this.energy = 5;
}

Lichen.prototype.act = function(surroundings) {
  const emptySpace = func.findDirections(directions, surroundings, ' ');
  // log.trace('emptySpace', emptySpace);
  if (this.energy >= 13 && emptySpace.length > 0) {
    return {type: 'reproduce', direction: func.randomElement(emptySpace)};
  } else if (this.energy < 20) {
    return {type: 'photosynthesize'};
  }
  return {type: 'wait'};
};


function LichenEater() {
  this.energy = 10;
}

LichenEater.prototype.act = function(surroundings) {
  // 找出周围八个点的value为 ' ' 的方向，‘e，n，w，s’
  const emptySpace = func.findDirections(directions, surroundings, ' ');
  // 找出周围八个点的value为 '*'，也就是青苔的坐标方向
  const lichen = func.findDirections(directions, surroundings, '*');
  if (this.energy >= 30 && emptySpace.length > 0) {
    return {type: 'reproduce', direction: func.randomElement(emptySpace)};
  } else if (lichen.length > 0) {
    return {type: 'eat', direction: func.randomElement(lichen)};
  } else if (emptySpace.length > 0) {
    return {type: 'move', direction: func.randomElement(emptySpace)};
  }
  return {type: 'wait'};
};

function CleverLichenEater() {
  this.energy = 10;
  this.direction = 'ne';
}

CleverLichenEater.prototype.act = function(surroundings) {
  const emptySpace = func.findDirections(directions, surroundings, ' ');
  const lichen = func.findDirections(directions, surroundings, '*');
  // log.trace('emptySpace', emptySpace);
  // log.trace('lichen', lichen);
  if (surroundings[this.direction] !== ' ') {
    if (emptySpace.length !== 0) {
      this.direction = func.randomElement(emptySpace);
    }
  }

  if (this.energy >= 30 && emptySpace.length > 0) {
    return {type: 'reproduce', direction: func.randomElement(emptySpace)};
  } else if (lichen.length > 1) {
    return {type: 'eat', direction: func.randomElement(lichen)};
  } else if (emptySpace.length > 0) {
    return {type: 'move', direction: this.direction};
  }
  return {type: 'wait'};
};


module.exports = {Lichen, LichenEater, CleverLichenEater};
