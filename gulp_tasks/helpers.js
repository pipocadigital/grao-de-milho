var gulp            = require( 'gulp' ),
    fs              = require( 'fs' ),
    helpers         = {};



// Helpers
gulp.task( 'helpers', function() {

  helpers.slugify = function( str ) {
    str = str.replace( /^\s+|\s+$/g, '' ); // trim
    str = str.toLowerCase();
    var from = 'àáäâèéëêìíïîòóöôùúüûñç·/_,:;';
    var to   = 'aaaaeeeeiiiioooouuuunc------';

    for (var i=0, l=from.length ; i<l ; i++ )
      str = str.replace( new RegExp( from.charAt(i), 'g' ), to.charAt( i ) );

    str = str.replace( /[^a-z0-9 -]/g, '' ) // remove invalid chars
      .replace( /\s+/g, '-' ) // collapse whitespace and replace by -
      .replace( /-+/g, '-' ); // collapse dashes
    return str;
  }

  helpers.fileExists = function(filePath) {
    try {
      return fs.statSync(filePath).isFile();
    } catch (err) {
      return false;
    }
  }

  helpers.log = function( message, type ) {
    var hour = new Date().toTimeString().split(' ')[0],
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

    log += '[\x1b[90m'+hour+'\x1b[0m] >> ';
    log += color;
    log += message;
    log += '\x1b[0m';
    console.log( log );
  }

  gulp.helpers = helpers;

});
