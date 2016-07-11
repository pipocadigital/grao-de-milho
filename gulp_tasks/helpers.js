var gulp    = require('gulp'),
    fs = require('fs'),
    helpers = {};



// Helpers
gulp.task('helpers', function(){

  helpers.slugify = function( str ) {
    str = str.replace(/^\s+|\s+$/g, ''); // trim
    str = str.toLowerCase();
    var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
    var to   = "aaaaeeeeiiiioooouuuunc------";

    for (var i=0, l=from.length ; i<l ; i++)
      str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));

    str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
      .replace(/\s+/g, '-') // collapse whitespace and replace by -
      .replace(/-+/g, '-'); // collapse dashes
    return str;
  }

  helpers.fileExists = function( filePath ) {
    try {
      return fs.statSync(filePath).isFile();
    } catch (err) {
      return false;
    }
  }

  helpers.console = function( message, type ) {
    console.log('\x1b[31m', message ,'\x1b[0m');
  }

  gulp.helpers = helpers;

});
