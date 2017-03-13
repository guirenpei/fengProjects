'use strict';
/* eslint no-console: 0 */

const _ = require('lodash');
const log = require('rainbowlog');


let globals = {};

function makeBindFun(resolver) {
  return (k, v) => {
    const stack = globals[k] || [];
    globals[k] = resolver(stack, v);
    return globals;
  };
}

const stackBinder = makeBindFun((stack, v) => {
  stack.push(v);
  return stack;
});

const stackUnBinder = makeBindFun((stack) => {
  stack.pop();
  return stack;
});

const dynamicLookup = (k) => {
  const slot = globals[k] || [];
  return _.last(slot);
};
log.trace(stackBinder('a', 1));
log.trace(stackBinder('b', 100));

log.trace(dynamicLookup('a'));
log.trace('globals', globals);

log.trace(stackBinder('a', '*'));
log.trace(dynamicLookup('a'));

log.trace('globals', globals);

log.trace(stackUnBinder('a'));
log.trace(dynamicLookup('a'));
