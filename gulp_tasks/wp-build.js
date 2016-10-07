var gulp 		 = require('gulp'),
		plumber  = require('gulp-plumber'),
		del      = require('del');

// WP Files
gulp.task('wp-build', function() {
	var packageJson = gulp.config.packageJson,
			gulpPaths   = gulp.paths;
	del([
		gulpPaths.themesWp + '*',
		'!' + gulpPaths.themesWp + packageJson.name,
		'!' + gulpPaths.themesWp + 'index.php'
	]);

	gulp.src([gulpPaths.pluginsWp])
		.pipe(plumber({
			errorHandler: function(error) {
				console.log(error.message);
				this.emit('end');
			}
		}))
		.pipe(gulp.dest('wordpress/wp-content/plugins/'));

	gulp.src('wp-config.php')
		.pipe(plumber({
			errorHandler: function(error) {
				console.log(error.message);
				this.emit('end');
			}
		}))
		.pipe(gulp.dest(gulpPaths.basePath));

	gulp.src('src/style.css')
		.pipe(plumber({
			errorHandler: function(error) {
				console.log(error.message);
				this.emit('end');
			}
		}))
		.pipe(gulp.dest(gulpPaths.pagesDest));
});
