'use strict';
const Terrarium = require('./terrarium');
const func = require('./lib/funcs');
const {directions, Dictionary} = require('./dictionary');
const Point = require('./point');
const log = require('rainbowlog');


function LifeLikeTerrarium(creatureTypes, plan) {
  Terrarium.call(this, creatureTypes, plan);
}
LifeLikeTerrarium.prototype = func.clone(Terrarium.prototype);
LifeLikeTerrarium.prototype.constructor = LifeLikeTerrarium;

LifeLikeTerrarium.prototype.processCreature = function(creature, point) {
  // log.trace('creature', creature);
  // log.trace('point', point);
  let energy; // 此次creature要进行的活动所消耗的能量
  let action;
  const self = this;
  function dir() {
    if (!directions.contains(action.direction)) { return null; }
    const target = point.add(directions.lookup(action.direction));
    if (!self.grid.isInside(target)) { return null; }
    return target;
  }
  action = creature.act(this.listSurroundings(point));
  // log.trace('action', action);
  if (action.type === 'move') {
    // log.trace('move', creature);
    energy = this.creatureMove(creature, point, dir());
  } else if (action.type === 'eat') {
    // log.trace('eat', creature);
    energy = this.creatureEat(creature, dir());
  } else if (action.type === 'photosynthesize') {
    // log.trace('photosynthesize', creature);
    energy = -1;
  } else if (action.type === 'reproduce') {
    // log.trace('reproduce', creature);
    energy = this.creatureReproduce(creature, dir());
  } else if (action.type === 'wait') {
    // log.trace('wait', creature);
    energy = 0.2;
  } else {
    throw new Error(`Unsupport action: ${action.type}`);
  }
  creature.energy -= energy;
  if (creature.energy <= 0) {
    this.grid.setValueAt(point, undefined);
  }
};

LifeLikeTerrarium.prototype.creatureMove = function(creature, from, to) {
  if (to !== null && this.grid.valueAt(to) === undefined) {
    this.grid.moveValue(from, to);
    from.x = to.x;
    from.y = to.y;
  }
  return 1;
};

LifeLikeTerrarium.prototype.creatureEat = function(creature, source) {
  let energy = 1;
  if (source !== null) {
    const meal = this.grid.valueAt(source);
    // log.trace('meal', meal);
    if (meal !== undefined && meal.energy) {
      this.grid.setValueAt(source, undefined);
      energy -= meal.energy;
      // log.trace('meal-eat', energy);
    }
  }
  return energy;
};

LifeLikeTerrarium.prototype.creatureReproduce = function(creature, target) {
  let energy = 1;
  if (target !== null && this.grid.valueAt(target) === undefined) {
    const species = func.characterFromElement(creature);
    const baby = func.elementFromCharacter(this.creatureTypes, species);
    energy = baby.energy * 2;
    if (creature.energy >= energy) {
      this.grid.setValueAt(target, baby);
    }
  }
  return energy;
};

module.exports = LifeLikeTerrarium;



















log.trace('LifeLikeTerrarium end');
