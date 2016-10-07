var gulp 		 		 = require('gulp'),
		plumber  		 = require('gulp-plumber'),
		readlineSync = require('readline-sync'),
		helper 		   = require('./helpers'),
		del      		 = require('del');

// WP Files
gulp.task('wp-build', function() {
	var dbName 			= readlineSync.question('[wp-config] DB name: '),
	    dbUser 			= readlineSync.question('[wp-config] DB user: '),
	    dbPass 			= readlineSync.question('[wp-config] DB password: '),
	    dbHost 			= readlineSync.question('[wp-config] DB host: '),
			packageJson = gulp.config.packageJson,
			gulpPaths   = gulp.paths;

  helper.updateWpConfig({ name: dbName, user: dbUser, pass: dbPass, host: dbHost });
  helper.updateWpStyle(packageJson.title);
  helper.updateWpKeys();

	del([gulpPaths.themesWp + '*', '!' + gulpPaths.themesWp + packageJson.name, '!' + gulpPaths.themesWp + 'index.php']);

	gulp.src([gulpPaths.pluginsWp])
		.pipe(plumber({
			errorHandler: function(error) {
				console.log(error.message);
				this.emit('end');
			}
		}))
		.pipe(gulp.dest('wordpress/wp-content/plugins/'));

	gulp.src('src/style.css')
		.pipe(plumber({
			errorHandler: function(error) {
				console.log(error.message);
				this.emit('end');
			}
		}))
		.pipe(gulp.dest(gulpPaths.pagesDest));
});
