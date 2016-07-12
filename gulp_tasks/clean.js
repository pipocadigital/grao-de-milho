var gulp            = require( 'gulp' ),
    del             = require( 'del' );


console.log( gulp.paths.pagesDest );
// Clean
gulp.task( 'clean', function() {
  return del( gulp.paths.pagesDest );
});
