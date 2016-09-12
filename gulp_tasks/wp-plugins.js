var gulp            = require('gulp'),
    plumber         = require('gulp-plumber');



// WP Plugins
gulp.task('wp-plugins', function() {
  return gulp.src([gulp.paths.pluginsWp])
    .pipe(plumber({
      errorHandler: function(error) {
        console.log(error.message);
        this.emit('end');
  }}))
  .pipe(gulp.dest('wordpress/wp-content/plugins/'));
});
