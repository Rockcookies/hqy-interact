'use strict';

var path = require('path');
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync');

var globals = gulp.globals;

function reload (done) {
	return function () {
		browserSync.instance && browserSync.instance.reload();
		done();
	}
}

gulp.task('dist:html', function (done) {
	return gulp.src(globals.src + '/html/**/*.html')
	.pipe(gulp.dest(globals.dist));
});

gulp.task('watch:js', function (done) {
	$.sequence(['dist:js'], reload(done));
});

gulp.task('watch:less', function (done) {
	$.sequence(['dist:less'], reload(done));
});

gulp.task('watch:html', function (done) {
	$.sequence(['dist:html'], reload(done));
});

gulp.task('build:debug', ['clean'], function (done) {
	$.sequence(['dist:js', 'dist:less', 'dist:html'], done);
});

gulp.task('watch', ['build:debug'], function (done) {
	gulp.watch(path.join(globals.src_js, '**/*'), ['watch:js']);
	gulp.watch(path.join(globals.src_less, '**/*'), ['watch:less']);
	gulp.watch(path.join(globals.src + '/html', '**/*'), ['watch:html']);
	done();
});

gulp.task('serve', ['watch'], function (done) {
	browserSync.instance = browserSync.init({
		port: 3000,
		startPath: 'index.html',
		server: {
			baseDir: globals.dist
		},
		reloadDelay: 1000,
		notify: false
	});

	done();
});