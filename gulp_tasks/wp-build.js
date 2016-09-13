var gulp            = require('gulp'),
    plumber         = require('gulp-plumber');



// WP Files
gulp.task('wp-build', function() {
    gulp.src([gulp.paths.pluginsWp])
      .pipe(plumber({
        errorHandler: function(error) {
          console.log(error.message);
          this.emit('end');
    }}))
    .pipe(gulp.dest('wordpress/wp-content/plugins/'));

    gulp.src('wp-config.php')
    .pipe(plumber({
      errorHandler: function(error) {
        console.log(error.message);
        this.emit('end');
    }}))
    .pipe(gulp.dest(gulp.paths.basePath));

    gulp.src('src/style.css')
    .pipe(plumber({
      errorHandler: function(error) {
        console.log(error.message);
        this.emit('end');
    }}))
    .pipe(gulp.dest(gulp.paths.pagesDest));
});
