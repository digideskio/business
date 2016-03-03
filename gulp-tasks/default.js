const gulp        = require('gulp');
const runSequence = require('run-sequence');

gulp.task('default', function() {
	runSequence(
		'clean',
		'css',
		'js-move',
		'js-compile',
		'ssh'
	);
});
