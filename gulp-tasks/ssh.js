const gulp		= require('gulp');
const shell 	= require('shelljs');
const argv		= require('yargs').argv;
const path		= '/web/bgapps/html/common/js/business';
const host		= 'shell.boston.com';

gulp.task('ssh', function(cb) {
	if (argv.u) {
		const command = `scp -r dist/. ${argv.u}'@${host}:${path}`
		shell.exec(command, cb);	
	} else {
		console.log('enter -u username to upload')
		cb();
	}
	
});