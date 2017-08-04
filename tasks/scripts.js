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
const uglify = require('gulp-uglify');
const { log, colors } = require('gulp-util');
const args = require('./utils/args');

gulp.task('scripts', () => {
  return gulp.src(['app/js/index.js'])
    .pipe(plumber({
      errorHandler: function() {

      }
    }))
    .pipe(named())
    .pipe(gulpWebpack({
      module: {
        loaders: [{
          test: /\.js$/,
          loader: 'babel'
        }]
      }
    }), null, (err, stats) => {
      log(`Finished '${colors.cyan('scripts')}'`, stats.toString({
        chunks: false
      }));
    })
    .pipe(gulp.dest('server/public/js'))
    .pipe(rename({
      basename: 'cp',
      extname: 'min.js'
    }))
    .pipe(uglify({
      compress: {
        properties: false
      },
      output: {
        quote_keys: true
      }
    }))
    .pipe(gulp.dest('server/public.js'))
    .pipe(gulpif(args.watch, livereload()));
});