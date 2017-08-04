'use strict';
/* eslint camelcase: 0 */

const gulp = require('gulp');
const del = require('del');

gulp.task('clean', () => {
  return del(['server/public', 'server/views']);
});