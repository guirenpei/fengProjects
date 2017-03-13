'use strict';
/* eslint no-console: 0 */

const log = require('rainbowlog');
const Terrarium = require('./terrarium');
const LifeLikeTerrarium = require('./lifeLikeTerrarium');
const {Lichen, CleverLichenEater} = require('./LichenAndCreatures');
const {StupidBug, BouncingBug, DrunkBug} = require('./bugs');
const {directions, Dictionary} = require('./dictionary');
const func = require('../lib/funcs');

const thePlan = [
  '############################',
  '#      #    #      o      ##',
  '#                          #',
  '#          #####           #',
  '##         #   #    ##     #',
  '###           ##     #     #',
  '#           ###      #     #',
  '#   ####                   #',
  '#   ##       o             #',
  '# o  #         o       ### #',
  '#    #                     #',
  '############################'];

  const moodyCave = [
    '############################',
    '#                     ######',
    '#    ***                 **#',
    '#   *##**         **  c  *##',
    '#   ***    c      ##**    *#',
    '#      c          ##***   *#',
    '#                 ##**    *#',
    '#   c     #*              *#',
    '#*        #**        c    *#',
    '#***      ##**     c     **#',
    '#*****   ###***         *###',
    '############################'];

// const terrarium = new Terrarium(thePlan);
// log.info(terrarium.toString());
// terrarium.step();
// log.warn(terrarium.toString());
// terrarium.step();
// log.trace(terrarium.toString());
// terrarium.step();
// log.debug(terrarium.toString());

const creatureTypes = new Dictionary();
creatureTypes.register = function(constructor, character) {
  constructor.prototype.character = character;
  this.store(character, constructor);
};
creatureTypes.register(StupidBug, 'o');
creatureTypes.register(BouncingBug, '%');
creatureTypes.register(Lichen, '*');
// creatureTypes.register(LichenEater, 'c');
creatureTypes.register(CleverLichenEater, 'c');

DrunkBug.prototype.act = (surrounding) => { return {type: 'move', direction: func.randomElement(directions.names())}; };
creatureTypes.register(DrunkBug, '~');

const terrarium = new LifeLikeTerrarium(creatureTypes, moodyCave);
log.trace('terrarium\r\n', terrarium.toString());
for (let i = 0; i < 10; i++) {
  for (let j = 0; j < 20; j++) {
    terrarium.step();
  }
  log.trace('terrarium\r\n', terrarium.toString());
}
// terrarium.step();
// log.trace('terrarium\r\n', terrarium.toString());









































log.trace('end');
