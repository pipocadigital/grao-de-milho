const gulp = require('gulp');
const plumber = require('gulp-plumber');
const readlineSync = require('readline-sync');
const helper = require('./helpers');
const del = require('del');

gulp.task('wp-build', function() {
	const dbName = readlineSync.question('[wp-config] DB name: ');
	const dbUser = readlineSync.question('[wp-config] DB user: ');
	const dbPass = readlineSync.question('[wp-config] DB password: ');
	const dbHost = readlineSync.question('[wp-config] DB host: ');
	const packageJson = gulp.config.packageJson;
	const gulpPaths = gulp.paths;

	helper.updateWpConfig({ name: dbName, user: dbUser, pass: dbPass, host: dbHost });
	helper.updateWpStyle(packageJson.title);
	helper.updateWpKeys();

	del([gulpPaths.themesWp + '*', '!' + gulpPaths.themesWp + packageJson.name, '!' + gulpPaths.themesWp + 'index.php']);

	gulp.src([gulpPaths.pluginsWp])
		.pipe(plumber({
			errorHandler: error => {
				console.log(error.message);
				this.emit('end');
			}
		}))
		.pipe(gulp.dest('wordpress/wp-content/plugins/'));

	gulp.src('src/style.css')
		.pipe(plumber({
			errorHandler: error => {
				console.log(error.message);
				this.emit('end');
			}
		}))
		.pipe(gulp.dest(gulpPaths.pagesDest));
});
