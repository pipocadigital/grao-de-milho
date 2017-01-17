const gulp = require('gulp');
const helper = require('./helpers');
const fs = require('fs');
const args = process.argv;

gulp.task('set-format', function() {
	const packageJsonFile = './package.json';

	fs.readFile(packageJsonFile, 'utf8', function (error, data) {
		const validParams = ['wordpress', 'default']
		const newFormatIndex = args.indexOf('--name');
		let newFormat = '';
		let updatedPackageJson;

		if (error) {
			helper.log(error, 'danger');
			process.exit(1)
		}

		if (newFormatIndex === -1) {
			helper.log('Please, give us a valid project format using the `--name` param.', 'danger');
			process.exit(1)
		}

		updatedPackageJson = JSON.parse(data);

		newFormat = args.slice(newFormatIndex + 1);

		if (newFormat.length === 0 || (validParams.indexOf(newFormat[0]) === -1)) {
			helper.log('Please, give us a valid project format using the `--n` param.', 'danger');
			process.exit(1);
		}

		updatedPackageJson.projectFormat = newFormat[0];
		helper.writeOn(packageJsonFile, JSON.stringify(updatedPackageJson, null, '  '));
		helper.log('Format updated.', 'success');
	});
});