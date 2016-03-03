const gulp         = require('gulp');
const stylus       = require('gulp-stylus');
const autoprefixer = require('gulp-autoprefixer');
const rename       = require('gulp-rename');
var cleanCSS 	   = require('gulp-clean-css');

gulp.task('css', function() {
	return gulp.src('src/css/*.styl')
		.pipe(stylus())
		.pipe(autoprefixer())
		.pipe(cleanCSS({compatibility: 'ie8'}))
		.pipe(gulp.dest('.tmp/css'))
})
