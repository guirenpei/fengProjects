'use strict';

const EventEmitter = require('events').EventEmitter;
const page = new EventEmitter();
const timeSpent = (start) => (end) => end - start;

page.on('xiao mimi', (name) => {
  console.log(`${name} say love you , xiao mimi`);
});
const cost = timeSpent(Date.now());
process.nextTick(() => {
  page.emit('xiao mimi', 'xutengfeng');
}, 2000);
console.log('sleep 2000ms');
console.log('cost', cost(Date.now()));