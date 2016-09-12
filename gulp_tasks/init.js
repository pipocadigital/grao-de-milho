var gulp   		= require('gulp');
var helper 		= require('./helpers');
var args 			= process.argv;


gulp.task('init', function() {
	var projectName = '';
	var projectNameIndex = args.indexOf('--p');

	if (projectNameIndex !== -1) {
		projectName = args.slice(projectNameIndex + 1);

		helper.rewriteProjectName(projectName.join(' '));
	} else {
		helper.log('Please, give us a project name using the `--p` param.', 'danger');
	}
});
