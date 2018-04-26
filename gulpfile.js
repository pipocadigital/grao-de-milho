const gulp = require('gulp');
const gulpSync = require('gulp-sync')(gulp);
const requireTasksDir = require('require-dir');
const packageJson = require('./package.json');

const config = {
	packageJson,
	port: 3000,
	phpPort: 3838,
	localhost: 'localhost'
};

const developmentPaths = {
	pages: 'src/**/*.php',
	fonts: 'src/fonts/**/*.*',
	images: 'src/images/**/*.*',
	styles: 'src/css/**/*.sass',
	scripts: 'src/js/**/*.js'
};

const themes = 'wordpress/wp-content/themes/';
const theTheme = themes + packageJson.name;
const paths = Object.assign({
	basePath: 'wordpress/',
	styleWp: 'src/style.css',
	configWp: 'wp-config.php',
	pluginsWp: 'plugins/**/*.*',

	themesWp: themes,
	pagesDest: theTheme,
	fontsDest: `${theTheme}/fonts`,
	imagesDest: `${theTheme}/images`,
	stylesDest: `${theTheme}/css`,
	scriptsDest: `${theTheme}/js`
}, developmentPaths);

gulp.paths = paths;
gulp.config = config;

requireTasksDir('tasks');

gulp.task('wp', gulpSync.sync(['wp-install']));
gulp.task('default', gulpSync.sync(['build', 'watch', 'connect-sync']));
gulp.task('build', gulpSync.sync(['clean', 'styles', 'scripts', 'pages', 'images', 'fonts', 'libs']));

gulp.task('watch', () => {
	const paths = Object.keys(developmentPaths);

	paths.map(path => {
		// Combine each development path with a task
		return gulp.watch(gulp.paths[path], [path]);
	});
});
