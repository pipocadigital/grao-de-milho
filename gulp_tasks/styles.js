var gulp            = require('gulp'),
    plumber         = require('gulp-plumber'),
    sass            = require('gulp-sass'),
    rename          = require('gulp-rename'),
    autoprefixer    = require('gulp-autoprefixer'),
    browserSync     = require('browser-sync');



// Styles
gulp.task('styles', function(){

  // Wp theme style
  if(gulp.config.format === 'wordpress'){
    gulp.src(['src/*.css']).pipe(gulp.dest(gulp.paths.pagesDest));
  }

  return gulp.src([gulp.paths.styles])
    .pipe(plumber({
      errorHandler: function (error) {
        console.log(error.message);
        this.emit('end');
    }}))
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(rename({suffix: '.min'}))
    .pipe(autoprefixer(['last 2 versions', 'ie 8', 'ie 9', '> 1%']))
    .pipe(gulp.dest(gulp.paths.stylesDest))
    .pipe(browserSync.reload({stream:true}))
});
