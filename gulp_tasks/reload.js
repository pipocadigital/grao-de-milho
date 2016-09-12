var gulp            = require('gulp'),
    browserSync     = require('browser-sync');



// Reload
gulp.task('reload', function () {
  browserSync.reload();
});
