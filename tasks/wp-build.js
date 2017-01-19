const gulp = require('gulp');
const plumber = require('gulp-plumber');
const del = require('del');

gulp.task('wp-build', function() {
	const gulpPaths = gulp.paths;
	const packageJson = gulp.config.packageJson;

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
