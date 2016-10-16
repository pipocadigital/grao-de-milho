var fs      = require('fs'),
    slugify = require('slugify'),
    request = require('request');

// Helpers
function helpers() {
	function fileExists(filePath) {
		try {
			return fs.statSync(filePath).isFile();
		} catch (err) {
			return false;
		}
	}

	function log(message, type) {
		var date = new Date().toTimeString().split(' ')[0];
		var dateFormated = '[\x1b[90m' + date + '\x1b[0m] >> ';
		var color = '';
		var log = '';

		switch (type) {
			case 'danger':
				color = '\x1b[31m';
				break;
			case 'success':
				color = '\x1b[32m';
				break;
			default:
				color = '\x1b[34m';
		}

		log += dateFormated + color + message;
		log += '\x1b[0m';

		console.log(log);
	}

	function rewriteProjectName(name) {
		if (name === '') {
			this.log('Please, give us a project name using the `--p` param.', 'danger');
			process.exit();
		}

		this.updatePackageJson(name);
		this.updateBowerJson(name);
	}

	function updatePackageJson(name) {
		var packageJsonFile = './package.json';
		var slug = slugify(name).toLowerCase();
		var that = this;

		that.log('Configuring package.json', 'success');

		fs.readFile(packageJsonFile, 'utf8', function (err, data) {
			var updatedPackageJson;

			checkErrorsWhenIsReading(err);

			updatedPackageJson = JSON.parse(data);

			updatedPackageJson.version = '0.0.0';
			updatedPackageJson.name = slug;
			updatedPackageJson.title = name;
			updatedPackageJson.description = name;

			writeOn(packageJsonFile, JSON.stringify(updatedPackageJson, null, '  '));
		});
	}

	function updateBowerJson(name) {
		var bowerJsonFile = './bower.json';
		var slug = slugify(name).toLowerCase();

		this.log('Configuring bower.json', 'success');

		fs.readFile(bowerJsonFile, 'utf8', function (err, data) {
			checkErrorsWhenIsReading(err);

			writeOn(bowerJsonFile, data.replace(/grao-de-milho/g, slug));
		});
	}

	function updateWpStyle(name) {
		var wpStyleFile = './src/style.css';

		if (fileExists(wpStyleFile)) {
			fs.readFile(wpStyleFile, 'utf8', function (err, data) {
				checkErrorsWhenIsReading(err);

				writeOn(wpStyleFile, data.replace(/Grão de Milho/g, name));
			});
		}
	}

	function updateWpConfig(dbOptions) {
		var wpConfigDefaultUrl = './wp-config.php';
		var wpConfigUrl = './wordpress/wp-config.php';

		fs.readFile(wpConfigDefaultUrl, 'utf8', function (err, data) {
			checkErrorsWhenIsReading(err);

			data = data.replace(/database_name_here/g, dbOptions.name);
			data = data.replace(/username_here/g, dbOptions.user);
			data = data.replace(/password_here/g, dbOptions.pass);
			data = data.replace(/host_here/g, dbOptions.host);

			writeOn(wpConfigUrl, data);
		});
	}

	function updateWpKeys() {
		var wpConfigUrl = './wordpress/wp-config.php',
				url         = 'https://api.wordpress.org/secret-key/1.1/salt/';

		this.log('Generating authentication keys', 'success');

		request.get(url, function (err, response, body) {
			checkErrorsWhenIsReading(err);

			fs.readFile(wpConfigUrl, 'utf8', function (err, data) {
				checkErrorsWhenIsReading(err);

				data = data.replace(/AUTHENTICATION_KEY/gi, body);

				writeOn(wpConfigUrl, data);
			});
		});
	}

	function writeOn(file, content) {
		fs.writeFile(file, content, 'utf8', function (err) {
			checkErrorsWhenIsReading(err);
		});
	}

	function checkErrorsWhenIsReading(error) {
		if (error) {
			this.log(error, 'danger');
			process.exit(1)
		}
	}

	return {
		slugify,
		fileExists,
		log,
		rewriteProjectName,
		updateWpConfig,
		updatePackageJson,
		updateBowerJson,
		updateWpStyle,
		updateWpKeys
	};
}

module.exports = helpers();
