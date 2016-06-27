var gulp            = require('gulp'),
    browserSync     = require('browser-sync');



// Browser Sync
gulp.task('browser-sync', function() {
  browserSync({
    server: {
       baseDir: gulp.paths.basePath
    }
  });
});
