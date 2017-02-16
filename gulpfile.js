const gulp = require('gulp');
const gulpSync = require('gulp-sync')(gulp);
const requireDir = require('require-dir');
const packageJson = require('./package.json');

const baseConfig = {
	port: 3000,
	phpPort: 3838,
	localhost: 'localhost',
	packageJson: packageJson,
	format: packageJson.projectFormat ? packageJson.projectFormat : 'default',
	compressed: true
};

const wpThemePath = 'wordpress/wp-content/themes/' + packageJson.name;
const paths = {
	default: {
		basePath: 'www/',
		pagesDest: 'www/',
		stylesDest: 'www/css',
		fontsDest: 'www/fonts',
		imagesDest: 'www/images',
		scriptsDest: 'www/js'
	},
	wordpress: {
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
	}
};

const devPaths = {
	pages: 'src/**/*.php',
	scripts: 'src/js/**/*.js',
	styles: 'src/css/**/*.sass',
	images: 'src/images/**/*.*',
	fonts: 'src/fonts/**/*.*'
};

gulp.paths = Object.assign(devPaths, paths[baseConfig.format]);
gulp.config = baseConfig;

// Gulp tasks
requireDir('tasks');

gulp.task('default', gulpSync.sync(['build', 'watch', 'connect-sync']));

gulp.task('wp', gulpSync.sync(['wp-install']));

gulp.task('build', gulpSync.sync([
	'clean', 'styles', 'scripts', 'pages', 'images', 'fonts', 'libs'
]));

gulp.task('watch', () => {
	gulp.watch(gulp.paths.styles, ['styles']);
	gulp.watch(gulp.paths.scripts, ['scripts']);
	gulp.watch(gulp.paths.pages, ['pages']);
	gulp.watch(gulp.paths.images, ['images']);
	gulp.watch(gulp.paths.fonts, ['fonts']);
});
