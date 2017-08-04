'use strict';

process.stdin.resume();
process.stdin.setEncoding('utf-8');
process.stdin.on('data', (text) => {
  process.stdout.write(text.toUpperCase());
});
process.stdin.resume();
process.on('SIGNUP', () => {
  console.log('Reloading configuration');
});

console.log('PID:', process.pid);