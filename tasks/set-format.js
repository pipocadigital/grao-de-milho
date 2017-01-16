const gulp = require('gulp');
const helper = require('./helpers');
const fs = require('fs');
const args = process.argv;

gulp.task('set-format', function() {
	const packageJsonFile = './package.json';

	fs.readFile(packageJsonFile, 'utf8', function (error, data) {
		var newFormat = '';
		var newFormatIndex = args.indexOf('--n');
		var updatedPackageJson;
		var validParams = ['wordpress', 'default']

		if (error) {
			helper.log(error, 'danger');
			process.exit(1)
		}

		updatedPackageJson = JSON.parse(data);

		if (newFormatIndex !== -1) {
			newFormat = args.slice(newFormatIndex + 1);

			if (newFormat.length === 0 || (validParams.indexOf(newFormat[0]) === -1)) {
				helper.log('Please, give us a valid project format using the `--n` param.', 'danger');
				process.exit(1);
			}

			updatedPackageJson.projectFormat = newFormat[0];
			helper.writeOn(packageJsonFile, JSON.stringify(updatedPackageJson, null, '  '));
		} else {
			helper.log('Please, give us a valid project format using the `--n` param.', 'danger');
		}
	});
});