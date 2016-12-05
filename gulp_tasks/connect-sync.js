const gulp = require('gulp');
const connect = require('gulp-connect-php');
const browserSync = require('browser-sync');

gulp.task('connect-sync', function() {
	const serverConfig = {
		base: gulp.paths.basePath,
		port: gulp.config.port,
		livereload: true
	};

	connect.server(serverConfig, function () {
		browserSync({
			proxy: gulp.config.localhost + ':' + gulp.config.port
		});
	});
});
