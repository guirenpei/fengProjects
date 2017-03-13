'use strict';

let wall = {};

wall.character = '#';
exports.elementFromCharacter = function(creatureTypes, character) {
  if (character === ' ') {
    return undefined;
  } else if (character === '#') {
    return wall;
  } else if (creatureTypes.contains(character)) {
    return new (creatureTypes.lookup(character))();
  }
  throw new Error(`Unknow character: ${character}`);
};

exports.characterFromElement = function(element) {
  if (element === undefined) {
    return ' ';
  }
  return element.character;
};

exports.bind = function(func, object) {
  return (...args) => {
    return func.apply(object, args);
  };
};

exports.forEach = function(array, action) {
  for (let i = 0; i < array.length; i++) {
    action(array[i].object, array[i].point);
  }
};

const randomInteger = exports.randomInteger = function(below) {
  return Math.floor(Math.random() * below);
};

exports.randomElement = function(array) {
  if (array.length === 0) {
    throw new Error('this is a empty array');
  }
  return array[randomInteger(array.length)];
};

exports.clone = function(object) {
  function OneShotConstructor() {}
  console.log('clone object', object);
  OneShotConstructor.prototype = object;
  return new OneShotConstructor();
};

exports.findDirections = function(directions, surroundings, wanted) {
  // console.log('surroundings', surroundings);
  let found = [];
  directions.each(name => {
    if (surroundings[name] === wanted) {
      found.push(name);
    }
  });
  return found;
};

exports.forEachIn = function(object, action) {
  for (const property in object) {
    if (object.hasOwnProperty(property)) {
      action(property, object[property]);
    }
  }
};

const existy = exports.existy = (x) => {
  return x !== null;
};

exports.truthy = (x) => {
  return (x !== false) && existy(x);
};
