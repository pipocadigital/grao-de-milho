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
  localhost: '127.0.0.1',
  port: '3001'
};

// Paths
gulp.paths = {
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
    pagesDest: 'www/',
    fontsDest: 'www/fonts',
  },
  wordpress:
  {
    basePath: 'wordpress/',
    scripts: 'src/js/**/*.js',
    scriptsDest: 'wordpress/wp-content/themes/'+packageJson.name+'/js',
    styles: 'src/css/**/*.sass',
    stylesDest: 'wordpress/wp-content/themes/'+packageJson.name+'/css',
    images: 'src/img/**/*.*',
    imagesDest: 'wordpress/wp-content/themes/'+packageJson.name+'/img',
    pages: 'src/**/*.jade',
    pagesDest: 'wordpress/wp-content/themes/'+packageJson.name,
    fontsDest: 'wordpress/wp-content/themes/'+packageJson.name+'/fonts'
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
