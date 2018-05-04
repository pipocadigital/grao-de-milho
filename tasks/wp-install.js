const fs = require('fs');
const gulp = require('gulp');
const request = require('request');
const admZip = require('adm-zip');
const readlineSync = require('readline-sync');

const helper = require('./helpers');

gulp.task('wp-install', function() {
	const packageJson = gulp.config.packageJson;
	const projectName = process.argv.splice(process.argv.indexOf('--name'))[1];

	if (packageJson.name === 'grao-de-milho' || packageJson.name === '') {
		helper.log('Set the project name using gulp init --name "[Project Name]".', 'danger');
		helper.log('Stoping...', 'danger');
		process.exit(1);
	}

	helper.log('Downloading WordPress...', 'success');

	const latestWp = 'https://wordpress.org/latest.zip';
	const outputZip = 'latest.zip';

	request({
		url: latestWp,
		encoding: null
	}, function(err, _, data) {
		if (err) {
			throw err;
		}

		fs.writeFile(outputZip, data, err => {
			if (err) {
				throw err;
			}

			const zip = new admZip(outputZip);

			helper.log('Unzipping WordPress...', 'success');
			zip.extractAllTo('./');

			fs.unlink(outputZip, (err) => {
				if (err) {
					throw err;
				}

				helper.log(`Removing ${outputZip}...`, '');
			});

			copyWpConfigs();
		});
	});

	function copyWpConfigs() {
		helper.log('Copying wp-configs...', '');

		const files = [
			'wp-config.php',
			'wp-config-development.php',
			'wp-config-production.php',
			'wp-config-staging.php',
		];

		files.map(file => {
			fs.createReadStream(`./tasks/config/wordpress/${file}`)
				.pipe(fs.createWriteStream(`./wordpress/${file}`));
		});
	}
});

