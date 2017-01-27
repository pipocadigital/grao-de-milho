const gulp = require('gulp');
const connect = require('gulp-connect-php');
const browserSync = require('browser-sync');

gulp.task('connect-sync', function() {
	const proxy = gulp.config.localhost + ':' + gulp.config.phpPort;
	const serverConfig = {
		base: gulp.paths.basePath,
		port: gulp.config.phpPort,
		livereload: true
	};

	connect.server(serverConfig, () => browserSync({
		proxy: proxy,
		port: gulp.config.port
	}));
});
