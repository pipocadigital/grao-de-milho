const gulp = require('gulp');
const gulpSync = require('gulp-sync')(gulp);
const requireDir = require('require-dir');
const packageJson = require('./package.json');

const baseConfig = {
	port: 3000,
	phpPort: 3838,
	localhost: 'localhost',
	packageJson: packageJson,
	compressed: true
};

const wpThemePath = 'wordpress/wp-content/themes/' + packageJson.name;
const paths = {
	basePath: 'wordpress/',
	pluginsWp: 'plugins/**/*.*',
	styleWp: 'src/style.css',
	configWp: 'wp-config.php',
	pagesDest: wpThemePath,
	fontsDest: wpThemePath + '/fonts',
	imagesDest: wpThemePath + '/images',
	stylesDest: wpThemePath + '/css',
	scriptsDest: wpThemePath + '/js',
	themesWp: 'wordpress/wp-content/themes/'
};

const devPaths = {
	pages: 'src/**/*.php',
	scripts: 'src/js/**/*.js',
	styles: 'src/css/**/*.sass',
	images: 'src/images/**/*.*',
	fonts: 'src/fonts/**/*.*'
};

gulp.paths = Object.assign(devPaths, paths);
gulp.config = baseConfig;

// Gulp tasks
requireDir('tasks');

gulp.task('wp', gulpSync.sync(['wp-install']));
gulp.task('default', gulpSync.sync(['build', 'watch', 'connect-sync']));
gulp.task('build', gulpSync.sync(['clean', 'styles', 'scripts', 'pages', 'images', 'fonts', 'libs']));

gulp.task('watch', () => {
	gulp.watch(gulp.paths.styles, ['styles']);
	gulp.watch(gulp.paths.scripts, ['scripts']);
	gulp.watch(gulp.paths.pages, ['pages']);
	gulp.watch(gulp.paths.images, ['images']);
	gulp.watch(gulp.paths.fonts, ['fonts']);
});
