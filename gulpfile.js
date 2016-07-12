// Modules
// --------------------------------------------------------- //
var gulp            = require('gulp'),
    gulpsync        = require('gulp-sync')(gulp),
    requireDir      = require('require-dir');


// Config & Paths
// --------------------------------------------------------- //
gulp.packageJson     = require('./package.json');

gulp.config = {
  compressed: true,
  format: 'wordpress',
  localhost: '127.0.0.1',
  port: '3001'
};

// Paths List
gulp.pathsList = {
  default:
  {
    basePath: 'www/',
    scripts: 'src/js/**/*.js',
    styles: 'src/css/**/*.sass',
    images: 'src/img/**/*.*',
    pages: 'src/**/*.jade',
    scriptsDest: 'www/js',
    stylesDest: 'www/css',
    imagesDest: 'www/img',
    pagesDest: 'www/',
    fontsDest: 'www/fonts',
  },
  wordpress:
  {
    basePath: 'wordpress/',
    scripts: 'src/js/**/*.js',
    styles: 'src/css/**/*.sass',
    images: 'src/img/**/*.*',
    pages: 'src/**/*.jade',
    scriptsDest: function() {
      return 'wordpress/wp-content/themes/'+ gulp.packageJson.name +'/js';
    }(),
    stylesDest: function() {
      return 'wordpress/wp-content/themes/'+ gulp.packageJson.name +'/css';
    }(),
    imagesDest: function() {
      return 'wordpress/wp-content/themes/'+ gulp.packageJson.name +'/img';
    }(),
    pagesDest: function() {
      return 'wordpress/wp-content/themes/'+ gulp.packageJson.name;
    }(),
    fontsDest: function() {
      return 'wordpress/wp-content/themes/'+ gulp.packageJson.name +'/fonts';
    }()
  }
};

gulp.paths = gulp.pathsList[ gulp.config.format ];

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

// Init
gulp.task( 'init', gulpsync.sync([
  'helpers',
  'wp-install',
  'config',
  'default'
  ])
);
