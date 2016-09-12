var gulp            = require('gulp'),
    connect         = require('gulp-connect-php'),
    browserSync     = require('browser-sync');



// Connect Sync
gulp.task('connect-sync', function() {
  connect.server({
    port: gulp.config.port,
    base: gulp.paths.basePath,
    livereload: true
    }, function (){
    browserSync({
      proxy: gulp.config.localhost+':'+gulp.config.port
    });
  });
});
