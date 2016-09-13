var gulp            = require('gulp'),
    browserSync     = require('browser-sync');

// Fonts
gulp.task('fonts', function(){
  gulp.src(gulp.paths.fonts)
    .pipe(gulp.dest(gulp.paths.fontsDest))
    .pipe(browserSync.reload({stream:true}));
});
