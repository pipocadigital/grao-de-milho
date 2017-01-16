const gulp = require('gulp');
const connect = require('gulp-connect-php');
const browserSync = require('browser-sync');

gulp.task('connect-sync', function() {
	const proxy = gulp.config.localhost + ':' + gulp.config.port;
	const serverConfig = {
		base: gulp.paths.basePath,
		port: gulp.config.port,
		livereload: true
	};

	connect.server(serverConfig, () => browserSync({ proxy }));
});
