// TODO: refactor this file ASAP.
const fs = require('fs');
const slugify = require('slugify');
const request = require('request');

const wpStyleFile = './src/style.css';
const wpConfigFile = './wp-config.php';
const bowerJsonFile = './bower.json';
const packageJsonFile = './package.json';

function rewriteProjectName(name) {
	if (name === '') {
		log('Please, give us a project name using the `--p` param.', 'danger');
		process.exit();
	}

	updatePackageJson(name);
	updateBowerJson(name);
}

function updatePackageJson(name) {
	const slug = getSlug(name);

	log('Configuring package.json...', 'success');

	fs.readFile(packageJsonFile, 'utf8', function (error, data) {
		checkErrorsAndExit(error);

		const updatedPackageJson = JSON.parse(data);
		updatedPackageJson.version = '0.0.0';
		updatedPackageJson.name = slug;
		updatedPackageJson.title = name;
		updatedPackageJson.description = name;

		writeOn(packageJsonFile, JSON.stringify(updatedPackageJson, null, '  '));
	});
}

function updateBowerJson(name) {
	const slug = getSlug(name);

	log('Configuring bower.json', 'success');

	fs.readFile(bowerJsonFile, 'utf8', function (error, data) {
		checkErrorsAndExit(error);

		const updatedBowerJson = JSON.parse(data);
		updatedBowerJson.name = slug;

		writeOn(bowerJsonFile, JSON.stringify(updatedBowerJson, null, '  '));
	});
}

function updateWpStyle(name) {
	if (fileExists(wpStyleFile)) {
		fs.readFile(wpStyleFile, 'utf8', function (error, data) {
			checkErrorsAndExit(error);

			writeOn(wpStyleFile, data.replace(/Grão de Milho/g, name));
		});
	}
}

function updateWpConfig(dbOptions) {
	fs.readFile(wpConfigFile, 'utf8', function (error, data) {
		checkErrorsAndExit(error);

		const newWpConfigFile = './wordpress/wp-config.php';

		data = data.replace(/database_name_here/g, dbOptions.name);
		data = data.replace(/username_here/g, dbOptions.user);
		data = data.replace(/password_here/g, dbOptions.pass);
		data = data.replace(/host_here/g, dbOptions.host);

		writeOn(newWpConfigFile, data);
	});
}

function updateWpKeys() {
	const secretKeyUrl = 'https://api.wordpress.org/secret-key/1.1/salt/';

	log('Generating authentication keys', 'success');

	request
		.get(secretKeyUrl, function (error, response, body) {
			checkErrorsAndExit(error);

			const wpConfigUrl = './wordpress/wp-config.php';

			fs.readFile(wpConfigUrl, 'utf8', function (err, data) {
				checkErrorsAndExit(err);

				data = data.replace(/AUTHENTICATION_KEY/gi, body);

				writeOn(wpConfigUrl, data);
			});
		});
}

function getSlug(name) {
	return slugify(name).toLowerCase();
}

function checkErrorsAndExit(error) {
	if (error) {
		log(error, 'danger');
		process.exit(1)
	}
}

function writeOn(file, content) {
	fs.writeFile(file, content, 'utf8', err => checkErrorsAndExit(err));
}

function fileExists(filePath) {
	try {
		return fs.statSync(filePath).isFile();
	} catch (err) {
		// TODO: handle this
		return false;
	}
}

function log(message, type) {
	const date = new Date().toTimeString();
	const dateFormated = dateTermnialOutputFormat(date.split(' ')[0]);
	const color = colorByAlertType(type);
	const log = dateFormated + color + message + '\x1b[0m';

	console.log(log);
}

function dateTermnialOutputFormat(date) {
	return '[\x1b[90m' + date + '\x1b[0m] >> ';
}

function colorByAlertType(type) {
	switch (type) {
		case 'danger':
			return '\x1b[31m';
		case 'success':
			return '\x1b[32m';
		default:
			return '\x1b[34m';
	}
}

module.exports = {
	log,
	writeOn,
	fileExists,
	updateWpConfig,
	rewriteProjectName,
	updateWpStyle,
	updateWpKeys
};
