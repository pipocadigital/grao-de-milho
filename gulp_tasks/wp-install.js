var gulp            = require( 'gulp' ),
    request         = require( 'request' ),
    zlib            = require( 'zlib' ),
    fs              = require( 'fs' ),
    AdmZip          = require( 'adm-zip' ),
    fileUrl         = 'https://wordpress.org/latest.zip',
    output          = 'latest.zip';



// WP Install
gulp.task( 'wp-install', function() {
  var helpers     = gulp.helpers,
      packageJson = gulp.config.packageJson,
      initialized = helpers.fileExists( './'+ gulp.paths.basePath +'/index.php' ),
      projectName = process.argv.splice( process.argv.indexOf( '--p' ) )[1];

  if( initialized ) {

    helpers.log('Ops! Wordpress is already installed.', 'danger');
    helpers.log('Stoping...', 'danger');
    process.exit();

  } else if(0 && !projectName && packageJson.name === 'grao-de-milho') {

    helpers.log('Insert project name using gulp init --p "[Project Name]".', 'danger');
    helpers.log('Stoping...', 'danger');
    process.exit();

  } else {
    var i = 0;  // dots counter
    setInterval(function() {
      process.stdout.clearLine();  // clear current text
      process.stdout.cursorTo(0);  // move cursor to beginning of line
      i = (i + 1) % 4;
      var dots = new Array(i + 1).join(".");
      process.stdout.write("Waiting" + dots);  // write text
      helpers.log( 'Downloading wordpress'+dots);
    }, 300);

    packageJson.name = helpers.slugify( projectName );

    // Install WP
    var req = request({
        url: fileUrl,
        encoding: null
      }, function( err, resp, body ) {
        if( err ) throw err;
        fs.writeFile( output, body, function( err ) {
          console.log( '\x1b[32m', 'Unzipping wordpress...' ,'\x1b[0m' );
          var zip = new AdmZip( output );
          zip.extractAllTo( './' );
          fs.unlink( output );
          console.log( '\x1b[32m', 'Coping wp-config...' ,'\x1b[0m' );
          fs.createReadStream( 'wp-config.php' ).pipe( fs.createWriteStream( './wordpress/wp-config.php' ) );
        });
      });
    }
});
