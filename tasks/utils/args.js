'use strict';
const yargs = require('yargs');
const args = yargs
  .option('production', {
    boolean: true,
    default: false,
    describe: 'min all scripts'
  })
  .option('watch', {
    boolean: true,
    default: false,
    describe: 'watch all files'
  })
  .option('verbose', {
    boolean: true,
    default: false,
    describe: 'log'
  })
  .option('sourcemaps', {
    describe: 'force the creation of sourcemaps'
  })
  .option('port', {
    string: true,
    default: 4396,
    describe: 'server port'
  })
  .argv;
// module.exports = args;