var gulp            = require( 'gulp' ),
    request         = require( 'request' ),
    zlib            = require( 'zlib' ),
    fs              = require( 'fs' ),
    AdmZip          = require( 'adm-zip' ),
    fileUrl         = 'https://wordpress.org/latest.zip',
    output          = 'latest.zip';



// WP Install
gulp.task( 'wp-install', function() {

  var initialized = gulp.helpers.fileExists( './'+ gulp.pathsList.wordpress.basePath +'/index.php' ),
      projectName = process.argv.splice( process.argv.indexOf( '--p' ) )[1];

  if( !projectName ) {

    console.log( '\x1b[31m', 'Insert project name using gulp init --p "[Project Name]".' ,'\x1b[0m' );
    console.log( '\x1b[31m', 'Stoping...' ,'\x1b[0m' );
    process.exit();

  } else if( initialized ) {

    console.log( '\x1b[31m', 'Ops! Wordpress is already installed.', '\x1b[0m' );
    console.log( '\x1b[31m', 'Stoping...', '\x1b[0m' );
    process.exit();

  } else {

    console.log( '\x1b[32m', 'Downloading wordpress...' ,'\x1b[0m' );

    gulp.packageJson.name = gulp.helpers.slugify( projectName );


    // Install WP
    request({
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
