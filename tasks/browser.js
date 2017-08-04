'use strict';
/* eslint camelcase: 0 */

const gulp = require('gulp');
const args = require('./utils/args');

gulp.task('browser', (cb) => {
  if (!args.watch) {
    return cb();
  }
  gulp.watch('app/**/*.js', ['scripts']);
  gulp.watch('app/**/*.ejs', ['pages']);
  gulp.watch('app/**/*.css', ['css']);
});