'use strict';

var path = require('path');
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

var globals = gulp.globals;
var utils = gulp.utils;

gulp.task('dist:less:min', function () {
	return gulptask(true);
});

gulp.task('dist:less', function () {
	return gulptask(false);
});


function createLessPlugin (name, options) {
	var plugin = require('less-plugin-' + name);
	return new plugin(options || {});
}

var LessPlugin = {
	'est': createLessPlugin('est')
};

function gulptask (isMinify) {
	var task = gulp.src(path.join(globals.src_less, '**/*.main.less'));


	// source map init
	task.pipe($.sourcemaps.init())

	// less compile
	task.pipe($.less({
		strictMath: false,
		banner: (isMinify ? undefined : globals.banner),
		plugins: [LessPlugin.est],
		paths: [path.resolve(globals.src_less), path.resolve(globals.bower)]
	}))

	// handle less error
	.on('error', utils.log(task))

	// autoprefixer
	.pipe($.autoprefixer({
		browsers: [
			"Android 2.3",
			"Android >= 4",
			"Chrome >= 20",
			"Firefox >= 24",
			"Explorer >= 6",
			"iOS >= 6",
			"Opera >= 12",
			"Safari >= 6"
		]
	}))

	// minify css
	.pipe(utils.test(isMinify, $.minifyCss({
		compatibility: 'ie8',
		keepSpecialComments: '*',
		advanced: false
	})))

	// banner
	.pipe(utils.test(isMinify, $.header(globals.banner)))

	// rename
	.pipe($.rename(function (path) {
		if (isMinify) {
			path.basename = path.basename.replace(/\.main$/, '.min');
		} else {
			path.basename = path.basename.replace(/\.main$/, '');
		}
	}))

	// write source map
	.pipe($.sourcemaps.write('./'))

	// write files
	.pipe(gulp.dest(globals.dist_css));

	return task;
}