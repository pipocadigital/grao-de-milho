var gulp            = require('gulp'),
    plumber         = require('gulp-plumber'),
    gulpFilter      = require('gulp-filter'),
    mainBowerFiles  = require('gulp-main-bower-files'),
    concat          = require('gulp-concat'),
    rename          = require('gulp-rename'),
    uglify          = require('gulp-uglify'),
    cleanCss        = require('gulp-clean-css'),
    flatten         = require('gulp-flatten'),
    browserSync     = require('browser-sync');



// Libs
gulp.task('libs', function() {

  var jsFilter = gulpFilter('**/*.js', {restore: true});
  var cssFilter = gulpFilter('**/*.css', {restore: true});
  var fontFilter = gulpFilter(['**/*.eot', '**/*.woff' , '**/*.woff2' , '**/*.svg', '**/*.ttf'], {restore: true});

  return gulp.src('./bower.json')
    .pipe(mainBowerFiles({
      "overrides": {
       "font-awesome": {
         "main": [
           './css/font-awesome.min.css',
           './fonts/*.*'
         ]
       }
      }
    }))
    .pipe(plumber({
      errorHandler: function (error) {
        console.log(error.message);
        this.emit('end');
    }}))

    // JS
    .pipe(jsFilter)
    .pipe(concat('libs.js'))
    .pipe(rename({suffix: ".min"}))
    .pipe(uglify())
    .pipe(gulp.dest(gulp.paths.scriptsDest))
    .pipe(jsFilter.restore)

    //CSS
    .pipe(cssFilter)
    .pipe(cleanCss({compatibility: 'ie8'}))
    .pipe(concat('libs.min.css'))
    .pipe(gulp.dest(gulp.paths.stylesDest))
    .pipe(cssFilter.restore)

    // Fonts
    .pipe(fontFilter)
    .pipe(flatten())
    .pipe(gulp.dest(gulp.paths.fontsDest));

});
