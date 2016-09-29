var gulp            = require('gulp'),
    plumber         = require('gulp-plumber'),
    sass            = require('gulp-sass'),
    rename          = require('gulp-rename'),
    autoprefixer    = require('gulp-autoprefixer'),
    sourcemaps      = require('gulp-sourcemaps'),
    sassLint        = require('gulp-sass-lint'),
    browserSync     = require('browser-sync');

// Styles
gulp.task('styles', function() {
  return gulp.src(gulp.paths.styles)
    .pipe(plumber({
      errorHandler: function (error) {
        console.log(error.message);
        this.emit('end');
    }}))
    .pipe(sassLint({configFile: 'sass-lint.yml'}))
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError())
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(rename({suffix: '.min'}))
    .pipe(autoprefixer(['last 2 versions', 'ie 8', 'ie 9', '> 1%']))
    .pipe(sourcemaps.write('.', {
      mapFile: function(mapFilePath) {
        return mapFile.replace('.css.map', '.map');
      }
    }))
    .pipe(gulp.dest(gulp.paths.stylesDest))
    .pipe(browserSync.reload({stream:true}))
});
