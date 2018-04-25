const gulp = require('gulp');
const browserSync = require('browser-sync');

gulp.task('browser-sync', function() {
	const baseDir = gulp.paths.basePath;

	browserSync({server: {baseDir}});
});
