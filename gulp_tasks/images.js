const gulp = require('gulp');
const plumber = require('gulp-plumber');
const cache = require('gulp-cache');
const imagemin = require('gulp-imagemin');
const browserSync = require('browser-sync');

gulp.task('images', function() {
	return gulp.src(gulp.paths.images)
		.pipe(gulp.dest(gulp.paths.imagesDest))
		.pipe(browserSync.reload({stream: true}));
});
