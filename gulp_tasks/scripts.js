var gulp            = require('gulp'),
    plumber         = require('gulp-plumber'),
    rename          = require('gulp-rename'),
    uglify          = require('gulp-uglify'),
    concat          = require('gulp-concat'),
    sourcemaps      = require('gulp-sourcemaps'),
    browserSync     = require('browser-sync');

// Scripts
gulp.task('scripts', function(){
  return gulp.src(gulp.paths.scripts)
    .pipe(plumber({
      errorHandler: function(error){
        console.log(error.message);
        this.emit('end');
    }}))
    .pipe(sourcemaps.init())
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(sourcemaps.write('.', {
      mapFile: function(mapFilePath) {
        return mapFile.replace('.js.map', '.map');
      }
    }))
    .pipe(gulp.dest(gulp.paths.scriptsDest))
    .pipe(browserSync.reload({stream:true}))
});
