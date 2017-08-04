'use strict';
/* eslint camelcase: 0 */

const gulp = require('gulp');
const gulpif = require('gulp-if');
const concat = require('gulp-concat');
const webpack = require('webpack');
const gulpWebpack = require('webpack-stream');
const named = require('vinyl-named');
const livereload = require('gulp-livereload');
const plumber = require('gulp-plumber');
const rename = require('gulp-rename');
const gulpSequence = require('gulp-sequence');
const uglify = require('gulp-uglify');
const { log, colors } = require('gulp-util');
const args = require('./utils/args');

gulp.task('build', gulpSequence('clean', 'css', 'pages', 'scripts', ['browser', 'serve']));

