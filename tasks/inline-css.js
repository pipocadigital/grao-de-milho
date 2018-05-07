const fs = require('fs');
const gulp = require('gulp');
const replace = require('gulp-replace');
const browserSync = require('browser-sync');

gulp.task('inline-css', function() {
	const file = `${gulp.paths.stylesDest}/first-view.min.css`;

	if (!fs.existsSync(file)) {
		return false;
	}

	const inject = /<link\s*inject-first-view-css\s*(.*\>?)>/gi;
	const comments = /\/\*[^*]*.*?\*\//;

	const css = fs.readFileSync(file, 'utf8');
	const style = css.replace(comments, '').trim();

	return gulp.src([`${gulp.paths.pagesDest}**/*.php`])
		.pipe(replace(inject, () => `<style>${style}</style>`))
		.pipe(gulp.dest(gulp.paths.themesWp));
});
