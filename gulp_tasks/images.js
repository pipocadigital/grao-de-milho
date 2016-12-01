var gulp            = require('gulp'),
    plumber         = require('gulp-plumber'),
    cache           = require('gulp-cache'),
    imagemin        = require('gulp-imagemin'),
    browserSync     = require('browser-sync');

// Images
gulp.task('images', function() {
  return gulp.src(gulp.paths.images)
    .pipe(cache(imagemin({
    	optimizationLevel: 3,
    	progressive: true,
    	interlaced: true
    })))
    .pipe(gulp.dest(gulp.paths.imagesDest))
    .pipe(browserSync.reload({stream:true}));
});
