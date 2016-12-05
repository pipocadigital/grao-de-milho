const gulp = require( 'gulp' );
const request = require( 'request' );
const zlib = require( 'zlib' );
const fs = require( 'fs' );
const AdmZip = require( 'adm-zip' );
const readlineSync = require('readline-sync');
const helper = require('./helpers');
const fileUrl = 'https://wordpress.org/latest.zip';
const output = 'latest.zip';

// WP Install
gulp.task('wp-install', function() {
	const packageJson = gulp.config.packageJson;
	const wpIsInitialized = helper.fileExists('./wordpress/index.php');
	const projectName = process.argv.splice(process.argv.indexOf('--p'))[1];

	if(packageJson.name === 'grao-de-milho') {
		helper.log('Set the project name using gulp init --p "[Project Name]".', 'danger');
		helper.log('Stoping...', 'danger');
		process.exit();
	}

	if(wpIsInitialized) {
		helper.log('Ops! Wordpress is already installed.', 'danger');
		const answer = readlineSync.question('Do you want to reinstall wordpress? (Y or N) ');

		if(['N', 'NO'].indexOf(answer.toUpperCase()) >= 0) {
			helper.log('Stoping...', 'danger');
			process.exit();
		} else if(['Y', 'YES'].indexOf(answer.toUpperCase()) < 0) {
			helper.log('Answer unexpected', 'danger');
			helper.log('Stoping...', 'danger');
			process.exit();
		}
	}

	helper.log('Downloading wordpress...', 'success');

	// Download
	request({
		url: fileUrl,
		encoding: null
	}, function(err, res, body) {
		if(err) throw err;

		fs.writeFile(output, body, function(err) {
			if(err) throw err;

			helper.log('Unzipping wordpress...', 'success');

			const zip = new AdmZip(output);
			zip.extractAllTo('./');
			fs.unlink(output);

			helper.log('Coping wp-config...', 'success');
			fs.createReadStream('./wp-config.php').pipe(fs.createWriteStream('./wordpress/wp-config.php'));
			gulp.start('wp-build');
		});
	});
});

