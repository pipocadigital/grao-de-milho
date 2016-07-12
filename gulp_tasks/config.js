var gulp            = require( 'gulp' ),
    request         = require( 'request' ),
    zlib            = require( 'zlib' ),
    fs              = require( 'fs' ),
    fileUrl         = 'https://wordpress.org/latest.zip',
    output          = 'latest.zip';




// Replace Bower and Package.json
gulp.task( 'config', function() {

  console.log( '\x1b[32m', 'Config package.json' ,'\x1b[0m' );
  fileUrl = './package.json';
  fs.readFile( fileUrl, 'utf8', function( err, data ) {
    if ( err ) return console.log( err );
    var versionRegex = new RegExp('"version": "'+ gulp.packageJson.version +'"', 'g' );
    data = data.replace( /grao-de-milho/g, gulp.packageJson.name );
    data = data.replace( versionRegex, '"version": "0.0.0"' )

    fs.writeFile(fileUrl, data, 'utf8', function (err) {
       if( err ) {

         return console.log( err );

       } else {

         console.log( '\x1b[32m', 'Config bower json' ,'\x1b[0m' );
         fileUrl = './bower.json';
         fs.readFile( fileUrl, 'utf8', function( err, data ) {

           if (err) console.log( err );
           var result = data.replace( /grao-de-milho/g, gulp.packageJson.name );

           fs.writeFile( fileUrl, data, 'utf8', function( err ) {

              if ( err ) console.log( err );
              gulp.packageJson = require( '../package.json' );

           });
         });

      }
    });
  });

});
