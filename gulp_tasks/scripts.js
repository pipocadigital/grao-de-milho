var gulp            = require('gulp'),
    plumber         = require('gulp-plumber'),
    rename          = require('gulp-rename'),
    uglify          = require('gulp-uglify'),
    concat          = require('gulp-concat'),
    browserSync     = require('browser-sync');



// Scripts
gulp.task('scripts', function(){
  return gulp.src([gulp.paths.scripts])
    .pipe(plumber({
      errorHandler: function (error) {
        console.log(error.message);
        this.emit('end');
    }}))
    .pipe(concat('main.js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest(gulp.paths.scriptsDest))
    .pipe(browserSync.reload({stream:true}))
});
