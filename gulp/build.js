'use strict';

var gulp = require('gulp');
var del = require('del');
var $ = require('gulp-load-plugins')();

var globals = gulp.globals;

gulp.task('clean', function (done) {
	del.sync([globals.dist]);
	done();
});
