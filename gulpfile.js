'use strict';

var path = require('path');
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var pkg = require('./package.json');
var through = require('through2');

gulp.globals = {
	banner: '/*!!\n' + ' * Hqy Interact v' + pkg.version + '\n'
				+ ' * Copyright 2015-' + new Date().getFullYear() + ' ' + pkg.author.name + ' ( email: ' + pkg.author.email + ')\n'
				+ ' * Licensed under ' + pkg.license + '\n' + ' */\n',

	src: 'src',
	src_less: 'src/less',
	src_js: 'src/js',

	bower: 'bower_components',

	doc_src: 'doc_src',
	doc_dest: 'docs',

	dist: 'dist',
	dist_js: 'dist/js',
	dist_css: 'dist/css'
};


gulp.utils = {
	test: function (exp, task) {
		return exp ? task : through.obj();
	},

	log: function (task) {
		return function (e) {
			$.util.log(e);
			task.end();
		}
	}
};


require('require-dir')('./gulp');


gulp.task('default', ['clean'], function (done) {
	$.sequence('clean', ['dist:js', 'dist:js:min', 'dist:less', 'dist:less:min'])(done);
});
