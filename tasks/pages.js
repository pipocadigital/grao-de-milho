const gulp = require('gulp');
const plumber = require('gulp-plumber');
const browserSync = require('browser-sync');

gulp.task('pages', function() {
	return gulp.src(gulp.paths.pages)
		.pipe(plumber({
			errorHandler: error => {
				console.log(error.message);
				this.emit('end');
			}
		}))
		.pipe(gulp.dest(gulp.paths.pagesDest))
		.pipe(browserSync.reload({stream: true}));
});
