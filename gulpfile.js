/** ==================================
*   Gulpfile
* ====================================
*  - Info
*  - Config
*  - Paths
*  - Modules
*  - Tasks
*    - Browser Sync
*    - Clean
*    - Connect Sync
*    - Reload
*    - Styles
*    - Scripts
*    - Pages
*    - Images
*    - Libs
*      - JS
*      - CSS
*      - Fonts
*  - Watch
*  - Default
*  - Build
* ==================================
* ==================================
**/

var packageJson = require('./package.json'),

// Info
projectName = packageJson.name,

// Config
config = {
  compressed: true,
  format: 'default',
  localhost: '127.0.0.1',
  port: '3001'
},

// Paths
paths = {
  default:
  {
    basePath: 'www/',
    scripts: 'src/js/**/*.js',
    scriptsDest: 'www/js',
    styles: 'src/css/**/*.sass',
    stylesDest: 'www/css',
    images: 'src/img/**/*.*',
    imagesDest: 'www/img',
    pages: 'src/**/*.jade',
    fontsDest: 'www/fonts',
  },
  wordpress:
  {
    basePath: 'wordpress/wp-content/themes/'+projectName,
    scripts: 'src/js/**/*.js',
    scriptsDest: 'wordpress/wp-content/themes/'+projectName+'/js',
    styles: 'src/css/**/*.sass',
    stylesDest: 'wordpress/wp-content/themes/'+projectName+'/css',
    images: 'src/img/**/*.*',
    imagesDest: 'wordpress/wp-content/themes/'+projectName+'/img',
    pages: 'src/**/*.jade',
    fontsDest: 'wordpress/wp-content/themes/'+projectName+'/fonts'
  }
},

// Modules
gulp            = require('gulp'),
plumber         = require('gulp-plumber'),
rename          = require('gulp-rename'),
autoprefixer    = require('gulp-autoprefixer'),
minifyCss       = require('gulp-minify-css'),
concat          = require('gulp-concat'),
uglify          = require('gulp-uglify'),
imagemin        = require('gulp-imagemin'),
cache           = require('gulp-cache'),
sass            = require('gulp-sass'),
browserSync     = require('browser-sync'),
flatten         = require('gulp-flatten'),
gulpFilter      = require('gulp-filter'),
jade            = require('gulp-jade-php'),
connect         = require('gulp-connect-php'),
gulpsync        = require('gulp-sync')(gulp),
del             = require('del'),
mainBowerFiles  = require('gulp-main-bower-files');


// Tasks
paths = paths['default'];

// Browser Sync
gulp.task('browser-sync', function() {
  browserSync({
    server: {
       baseDir: paths.basePath
    }
  });
});

// Clean
gulp.task('clean', function() {
  return del([
    paths.basePath
  ]);
});

// Connect Sync
gulp.task('connect-sync', function() {
  connect.server({
    port: config.port,
    base: paths.basePath,
    livereload: true
    }, function (){
    browserSync({
      proxy: config.localhost+':'+config.port
    });
  });
});

// Reload
gulp.task('reload', function () {
  browserSync.reload();
});

// Styles
gulp.task('styles', function(){
  gulp.src([paths.styles])
    .pipe(plumber({
      errorHandler: function (error) {
        console.log(error.message);
        this.emit('end');
    }}))
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(rename({suffix: '.min'}))
    .pipe(autoprefixer(['last 2 versions', 'ie 8', 'ie 9', '> 1%']))
    .pipe(gulp.dest(paths.stylesDest))
    .pipe(browserSync.reload({stream:true}))
});

// Scripts
gulp.task('scripts', function(){
  return gulp.src([paths.scripts])
    .pipe(plumber({
      errorHandler: function (error) {
        console.log(error.message);
        this.emit('end');
    }}))
    .pipe(concat('main.js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest(paths.scriptsDest))
    .pipe(browserSync.reload({stream:true}))
});

// Pages
gulp.task('pages', function(){
  return gulp.src([paths.pages])
    .pipe(plumber({
      errorHandler: function (error) {
        console.log(error.message);
        this.emit('end');
    }}))
    .pipe(jade({
        pretty: !config.compressed,
        locals:{
          echo:function(str){
              return "<?php echo $"+str+"; ?>"
          }
        }
    }))
    .pipe(gulp.dest(paths.basePath))
    .pipe(browserSync.reload({stream:true}))
});

// Images
gulp.task('images', function(){
  gulp.src([paths.images])
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest(paths.imagesDest));
});

// Libs
gulp.task('libs', function() {

  var jsFilter = gulpFilter('**/*.js', {restore: true});
  var cssFilter = gulpFilter('**/*.css', {restore: true});
  var fontFilter = gulpFilter(['**/*.eot', '**/*.woff' , '**/*.woff2' , '**/*.svg', '**/*.ttf'], {restore: true});

  return gulp.src('./bower.json')
    .pipe(mainBowerFiles())
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
    .pipe(gulp.dest(paths.scriptsDest))
    .pipe(jsFilter.restore)

    //CSS
    .pipe(cssFilter)
    .pipe(minifyCss({compatibility: 'ie8'}))
    .pipe(concat('libs.min.css'))
    .pipe(gulp.dest(paths.stylesDest))
    .pipe(cssFilter.restore)

    // Fonts
    .pipe(fontFilter)
    .pipe(flatten())
    .pipe(gulp.dest(paths.fontsDest));

});

// Watch
gulp.task('watch',function(){
  gulp.watch(paths.styles, ['styles']);
  gulp.watch(paths.scripts, ['scripts']);
  gulp.watch(paths.pages, ['pages']);
  gulp.watch(paths.images, ['images']);
  gulp.task('reload');
});

// Default
gulp.task('default', gulpsync.sync([
  'build',
  'watch',
  'connect-sync'
  ])
);

// Build
gulp.task('build', gulpsync.sync([
  'clean',
  'styles',
  'scripts',
  'pages',
  'images',
  'libs'
  ])
);
