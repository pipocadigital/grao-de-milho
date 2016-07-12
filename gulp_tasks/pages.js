var gulp            = require( 'gulp' ),
    plumber         = require( 'gulp-plumber' ),
    jade            = require( 'gulp-jade-php' ),
    browserSync     = require( 'browser-sync' );



// Pages
gulp.task( 'pages', function() {
  return gulp.src( [ gulp.paths.pages ] )
    .pipe( plumber({
      errorHandler: function( error ) {
        console.log( error.message );
        this.emit( 'end' );
    }}))
    .pipe( jade({
        pretty: !gulp.config.compressed,
        locals: {
          echo: function( str ) {
            return "<?php echo $"+ str +"; ?>";
          },
          php: function( str ) {
            return "<?php $"+ str +"; ?>";
          }
        }
    }))
    .pipe( gulp.dest( gulp.paths.pagesDest ) )
    .pipe( browserSync.reload({stream:true} ) );

  browserSync.reload();
});
