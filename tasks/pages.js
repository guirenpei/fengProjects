'use strict';
/* eslint camelcase: 0 */

const gulp = require('gulp');
const gulpif = require('gulp-if');
const livereload = require('gulp-livereload');
const args = require('./utils/args');

gulp.task('pages', () => {
  return gulp.src('app/**/*.ejs')
    .pipe(gulp.dest('server'))
    .pipe(gulpif(args.watch, livereload()));
});