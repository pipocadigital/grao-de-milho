const gulp = require('gulp');
const path = require('path');
const CacheBust = require('gulp-cachebust');

const cache = new CacheBust({
	pathFormatter(dirname, basename, extname, checksum) {
	  	return path.join(dirname, basename + '.' + checksum + extname);
	}
});

gulp.task('new-version-css', function () {
	return gulp.src(gulp.paths.stylesDest + '/*.css')
		.pipe(cache.resources())
		.pipe(gulp.dest(gulp.paths.stylesDest));
});

gulp.task('new-version-js', function () {
	return gulp.src(gulp.paths.scriptsDest + '/*.js')
		.pipe(cache.resources())
		.pipe(gulp.dest(gulp.paths.scriptsDest));
});

gulp.task('asssets-new-version', ['new-version-css', 'new-version-js'], function () {
	return gulp.src(gulp.paths.pages)
		.pipe(cache.references())
		.pipe(gulp.dest(gulp.paths.pagesDest));
});
