const gulp = require('gulp');
const browserSync = require('browser-sync');

gulp.task('images', function() {
	return gulp.src(gulp.paths.images)
		.pipe(gulp.dest(gulp.paths.imagesDest))
		.pipe(browserSync.reload({stream: true}));
});
