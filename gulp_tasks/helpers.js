var fs      = require('fs'),
    slugify = require('slugify');

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
    var date = new Date().toTimeString().split(' ')[0],
    		dateFormated = '[\x1b[90m' + date + '\x1b[0m] >> ';
        color = '',
        log = '';

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
	  var bowerJsonUrl = './bower.json';
	  var packageJsonUrl = './package.json';
	  var packageJson = require('.' + packageJsonUrl);
	  var slug = slugify(name).toLowerCase();
	  var that = this;

	  if (name == '') {
	  	this.log('Please, give us a project name using the `--p` param.', 'danger');
	  	process.exit();
	  }

	  this.log('Config package.json...', 'success');
	  this.log('Config bower.json...', 'success');

	  fs.readFile(packageJsonUrl, 'utf8', function(err, data) {
	  	var versionRegex, newPackageContent;

	    if (err) {
	    	console.log(err, 'danger');
	    	process.exit();
	    }

	    newPackageContent = JSON.parse(data);

	    newPackageContent.version = '0.0.0';
	    newPackageContent.name = slug;
	    newPackageContent.title = name;
	    newPackageContent.description = name;

	    writeOn(packageJsonUrl, JSON.stringify(newPackageContent, null, '  '));
	  });

		fs.readFile(bowerJsonUrl, 'utf8', function(err, data) {
			var newBowerFile;

		 	if (err) {
		 		that.log(err, 'danger');
		 		process.exit();
		 	}

		 	writeOn(bowerJsonUrl, data.replace( /grao-de-milho/g, slug));
		});
  }

  function writeOn(file, content) {
  	var that = this;

  	fs.writeFile(file, content, 'utf8', function(err) {
	    if (err) {
		 		that.log(err, 'danger');
		 		process.exit();
		 	}
	 	});
  }

  return { slugify, fileExists, log, rewriteProjectName };
};

module.exports = helpers();
