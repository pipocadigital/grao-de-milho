const gulp = require('gulp');
const browserSync = require('browser-sync');

gulp.task('fonts', function() {
	return gulp.src(gulp.paths.fonts)
		.pipe(gulp.dest(gulp.paths.fontsDest))
		.pipe(browserSync.reload({stream: true}));
});
