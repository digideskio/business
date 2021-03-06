const gulp          = require('gulp');
const rename        = require('gulp-rename');
const replace 		= require('gulp-replace');
const webpackStream = require('webpack-stream');
const webpack       = require('webpack');
const fs 			= require('fs');
const version 		= require ('../package.json').version;

const config = {
	module: {
		loaders: [
			{ test: /\.csv?$/, loader: 'dsv-loader' },
			{ test: /\.json$/, loader: 'json-loader' },
			{ test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'}
		]
	}
};

const prod_config = Object.assign({}, config, {
	plugins: [
		new webpack.optimize.UglifyJsPlugin(),
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.optimize.DedupePlugin()
	]
});

gulp.task('js-move', function() {
	return gulp.src('src/js/**/*')
		.pipe(gulp.dest('.tmp/js'))
});

gulp.task('inject-meter-css', function() {
	const css = fs.readFileSync('.tmp/css/meter.css', 'utf8')
	return gulp.src('.tmp/js/meter/meter.js')
		.pipe(replace('*inject-css*', css))
		.pipe(gulp.dest('.tmp/js/meter'))
});

gulp.task('inject-socialConnect-css', function() {
	const css = fs.readFileSync('.tmp/css/socialConnect.css', 'utf8')
	return gulp.src('.tmp/js/socialConnect/socialConnect.js')
		.pipe(replace('*inject-css*', css))
		.pipe(gulp.dest('.tmp/js/socialConnect'))
});

gulp.task('inject-logo-svg', function() {
	const css = fs.readFileSync('src/svg/g-logo.svg', 'utf8')
	return gulp.src('.tmp/js/meter/meter-html.js')
		.pipe(replace('*inject-svg*', css))
		.pipe(gulp.dest('.tmp/js/meter'))
});

gulp.task('js-compile', ['inject-meter-css', 'inject-socialConnect-css', 'inject-logo-svg'], function() {
	return gulp.src('.tmp/js/index.js')
		.pipe(webpackStream(prod_config))
		.pipe(rename(`business-${version}.js`))
		.pipe(gulp.dest('dist'))
});

