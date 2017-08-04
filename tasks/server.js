'use strict';
/* eslint camelcase: 0 */

const gulp = require('gulp');
const liveserver = require('gulp-live-server');
const args = require('./utils/args');

gulp.task('serve', (cb) => {
  if (!args.watch) {
    return cb();
  }
  const server = liveserver.new('--harmony', 'server/bin/www');
  server.start();
  gulp.watch(['server/public/**/*.js', 'server/views/**/*.ejs'], (file) => {
    server.notify.apply(server, [file]);
  });
  gulp.watch(['server/routes/**/*.js', 'server/app.js'], () => {
    server.start.bind(server)();
  });
});