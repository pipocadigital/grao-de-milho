const gulp = require('gulp');
const request = require('request');
const fs = require('fs');
const admZip = require('adm-zip');
const readlineSync = require('readline-sync');
const helper = require('./helpers');

gulp.task('wp-install', function() {
	const packageJson = gulp.config.packageJson;
	const wpIsInitialized = helper.fileExists('./wordpress/index.php');
	const projectName = process.argv.splice(process.argv.indexOf('--name'))[1];

	if(packageJson.name === 'grao-de-milho' || packageJson.name === '') {
		helper.log('Set the project name using gulp init --name "[Project Name]".', 'danger');
		helper.log('Stoping...', 'danger');
		process.exit(1);
	}

	helper.log('Downloading WordPress...', 'success');

	const latestWp = 'https://wordpress.org/latest.zip';
	const outputZip = 'latest.zip';
	const wpConfigs = [
		'wp-config.php',
		'wp-config-development.php',
		'wp-config-production.php',
		'wp-config-staging.php',
	];

	request({
		url: latestWp,
		encoding: null
	}, function(reqError, _, data) {
		if(reqError) {
			throw reqError;
		}

		fs.writeFile(outputZip, data, error => {
			if(error) {
				throw error;
			}

			helper.log('Unzipping WordPress...', 'success');

			const zip = new admZip(outputZip);
			zip.extractAllTo('./');
			fs.unlink(outputZip);

			helper.log('Coping wp-configs...', 'success');

			wpConfigs.map(wpConfig => {
				fs.createReadStream(`./tasks/config/wordpress/${wpConfig}`)
					.pipe(fs.createWriteStream(`./wordpress/${wpConfig}`));
			})
		});
	});
});

