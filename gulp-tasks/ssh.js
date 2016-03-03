const gulp		= require('gulp');
const shell 	= require('shelljs');
const argv		= require('yargs').argv;
const path		= '/web/bgapps/html/common/js/business';
const host		= 'shell.boston.com';
const version	= require ('../package.json').version;

gulp.task('ssh', function(cb) {
	if (argv.u) {
		const command = `(cd dist; scp -r business-${version}.js ${argv.u}@${host}:${path})`
		console.log(command)
		shell.exec(command, cb);	
	} else {
		console.log('enter -u username to upload')
		cb();
	}
	
});