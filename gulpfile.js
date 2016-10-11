// Modules
// --------------------------------------------------------- //
var gulp            = require('gulp'),
    gulpsync        = require('gulp-sync')(gulp),
    requireDir      = require('require-dir'),
    packageJson     = require('./package.json');


// Config & Paths
// --------------------------------------------------------- //
gulp.config = {
  compressed: true,
  format: 'wordpress',
  localhost: 'localhost',
  port: '3000',
  packageJson: packageJson
};

// Paths
gulp.paths = {
  default:
  {
    basePath: 'www/',
    scripts:  'src/js/**/*.js',
    scriptsDest: 'www/js',
    styles: 'src/css/**/*.sass',
    stylesDest: 'www/css',
    images: 'src/images/**/*.*',
    imagesDest: 'www/images',
    pages: 'src/**/*.php',
    pagesDest: 'www/',
    fonts: 'src/fonts/**/*.*',
    fontsDest: 'www/fonts'
  },
  wordpress:
  {
    basePath: 'wordpress/',
    scripts: 'src/js/**/*.js',
    scriptsDest: 'wordpress/wp-content/themes/'+packageJson.name+'/js',
    styles: 'src/css/**/*.sass',
    stylesDest: 'wordpress/wp-content/themes/'+packageJson.name+'/css',
    images: 'src/images/**/*.*',
    imagesDest: 'wordpress/wp-content/themes/'+packageJson.name+'/images',
    pages: 'src/**/*.php',
    pagesDest: 'wordpress/wp-content/themes/'+packageJson.name,
    fonts: 'src/fonts/**/*.*',
    fontsDest: 'wordpress/wp-content/themes/'+packageJson.name+'/fonts',
    pluginsWp: 'plugins/**/*.*',
    themesWp: 'wordpress/wp-content/themes/',
    styleWp: 'src/style.css',
    configWp: 'wp-config.php'

  }
};

gulp.paths = gulp.paths[gulp.config.format];


// Tasks
// --------------------------------------------------------- //
requireDir('gulp_tasks');

// Watch
// --------------------------------------------------------- //
gulp.task('watch',function(){
  gulp.watch(gulp.paths.styles, ['styles']);
  gulp.watch(gulp.paths.scripts, ['scripts']);
  gulp.watch(gulp.paths.pages, ['pages']);
  gulp.watch(gulp.paths.images, ['images']);
  gulp.watch(gulp.paths.fonts, ['fonts']);
  gulp.watch(gulp.paths.fonts, ['fonts']);
});

// Default
var defautTasks = ['build', 'watch', 'connect-sync'];
gulp.task('default', gulpsync.sync(defautTasks));

// Install wp
var installWpTasks = ['wp-install'];
gulp.task('wp', gulpsync.sync(installWpTasks));

// Build
var buildTasks = ['clean', 'styles', 'scripts', 'pages', 'images', 'fonts', 'libs'];
gulp.task('build', gulpsync.sync(buildTasks));
