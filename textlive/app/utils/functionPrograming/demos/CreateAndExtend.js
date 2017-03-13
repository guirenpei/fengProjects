'use strict';
/* eslint no-console: 0 */

const log = require('rainbowlog');
const func = require('../lib/funcs');

// 继承对象的construc
Object.prototype.create = function(args) {
  const object = func.clone(this);
  log.trace('object', object);
  log.trace('this', this);
  log.trace('args', ...args);
  if (object.construc !== undefined) {
    object.construc.apply(object, ...args);
  }
  return object;
};

// 继承对象所有的属性
Object.prototype.extend = function(properties) {
  const result = func.clone(this);
  func.forEachIn(properties, (name, value) => {
    result[name] = value;
  });
  return result;
};

const Item = {
  construc: name => this.name = name,
  inspect: () => log.trace('It is', this.name, '.'),
  kick: () => log.trace('klunk!'),
  take: () => log.trace('You can ont lift ', this.name, '.'),
};

const lantern = Item.create('the brass lantern');
lantern.kick();

const DetailedItem = Item.extend({
  construc: (name, details) => {
    Item.construc.call(this, name);
    this.details = details;
  },
  inspect: () => log.trace('you see ', ', ', this.details, '.')
});

const giantSloth = DetailedItem.create('the giant sloth', 'It is queitly hanging from create, munching leaves');

giantSloth.inspect();

const SmallItem = Item.extend({
  kick: () => log.trace(this.name, 'flies across the room.'),
  take: () => log.trace('you take ', this.name, '.'),
});

const pencil = SmallItem.create('The red pencil');

pencil.take();






















log.trace('end');
