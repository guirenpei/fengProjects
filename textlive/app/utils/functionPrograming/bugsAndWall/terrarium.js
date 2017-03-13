'use strict';

const {directions, Dictionary} = require('./dictionary');
const Grid = require('./grid');
const Point = require('./point');
const {StupidBug, BouncingBug, DrunkBug} = require('./bugs');
const func = require('../lib/funcs');
const log = require('rainbowlog');

const creatureTypes = new Dictionary();
creatureTypes.register = function(constructor, character) {
  constructor.prototype.character = character;
  this.store(character, constructor);
};
DrunkBug.prototype.act = (surrounding) => { return {type: 'move', direction: func.randomElement(directions.names())}; };
creatureTypes.register(StupidBug, 'o');
creatureTypes.register(BouncingBug, '%');
creatureTypes.register(DrunkBug, '~');

function Terrarium(creatureTypes, plan) {
  this.creatureTypes = creatureTypes;
  const grid = new Grid(plan[0].length, plan.length);
  for (let y = 0; y < plan.length; y++) {
    const line = plan[y];
    for (let x = 0; x < line.length; x++) {
      grid.setValueAt(new Point(x, y), func.elementFromCharacter(creatureTypes, line.charAt(x)));
    }
  }
  this.grid = grid;
}
Terrarium.prototype.toString = function() {
  let characters = [];
  let endOfLine = this.grid.width - 1;
  this.grid.each((point, value) => {
    characters.push(func.characterFromElement(value));
    if (point.x === endOfLine) {
      characters.push('\n');
    }
  });
  return characters.join('');
};

Terrarium.prototype.listActingCreatures = function() {
  // 寻找生活在生物圈中，能进行活动的creature
  let found = [];
  this.grid.each((point, value) => {
    if (value !== undefined && value.act) {
      found.push({object: value, point: point});
    }
  });
  return found;
};

Terrarium.prototype.listSurroundings = function(center) {
  let result = {};
  let grid = this.grid;
  directions.each((name, direction) => {
    let place = center.add(direction);
    if (grid.isInside(place)) {
      result[name] = func.characterFromElement(grid.valueAt(place));
    } else {
      result[name] = '#';
    }
  });
  return result;
};

Terrarium.prototype.processCreature = function(creature, point) {
  const action = creature.act(this.listSurroundings(point));
  if (action.type === 'move' && directions.contains(action.direction)) {
    const to = point.add(directions.lookup(action.direction));
    if (this.grid.isInside(to) && this.grid.valueAt(to) === undefined) {
      this.grid.moveValue(point, to);
    }
  } else {
    throw new Error(`Unsupported action: ${action.type}`);
  }
};

Terrarium.prototype.step = function() {
  func.forEach(this.listActingCreatures(), func.bind(this.processCreature, this));
};
module.exports = Terrarium;
