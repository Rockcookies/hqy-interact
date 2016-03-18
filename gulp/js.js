var webpack = require('webpack');
var webpackStream = require('webpack-stream');
var path = require('path');
var gulp = require('gulp');
var glob = require('glob');
var $ = require('gulp-load-plugins')();

var globals = gulp.globals;

gulp.task('dist:js', function (done) {
	return gulptask(false);
});

gulp.task('dist:js:min', function (done) {
	return gulptask(true);
});


function gulptask (isMinify) {
	return gulp.src(path.join(globals.src_js, '**/*.main.js'))
		// webpack
		.pipe(webpackStream(webpackConfig(isMinify)))
		// write files
		.pipe(gulp.dest(globals.dist_js));
}

function getEntry() {
	var entry = {},
		src = path.resolve(globals.src_js);

	glob.sync(path.join(globals.src_js, '**/*.main.js')).forEach(function (name) {
		var key = path.relative(src, path.resolve(name));
		key = key.replace(/\.main.js$/, '');
		entry[key] = './' + key.replace(/\\/, '/') + '.main.js';
	});

	return entry;
}


function webpackConfig (isMinify) {
	var config = {
		cache: true,
		context: path.resolve(globals.src_js),
		entry: getEntry(),
		devtool: 'source-map',

		resolve: {
			alias: {},
			root: path.resolve(globals.src_js)
		},

		plugins: [
			new webpack.BannerPlugin(globals.banner, {
				raw: true
			})
		],

		output: {
			path: path.resolve(globals.dist_js),
			filename: '[name].js',
			sourceMapFilename: '[file].map'
		}
	};

	if (isMinify) {
		config.plugins.push(new webpack.optimize.UglifyJsPlugin({
			comments: /^!!|@preserve|@license/
		}));

		config.output.filename = '[name].min.js';
	}

	return config;
}