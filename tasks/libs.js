const gulp = require('gulp');
const plumber = require('gulp-plumber');
const gulpFilter = require('gulp-filter');
const mainBowerFiles = require('gulp-main-bower-files');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const cleanCss = require('gulp-clean-css');
const flatten = require('gulp-flatten');
const browserSync = require('browser-sync');

gulp.task('libs', function() {
	const fontsExtensions = ['**/*.eot', '**/*.woff' , '**/*.woff2' , '**/*.svg', '**/*.ttf'];

	const jsFilter = gulpFilter('**/*.js', {restore: true});
	const cssFilter = gulpFilter('**/*.css', {restore: true});
	const fontFilter = gulpFilter(fontsExtensions, {restore: true});

	return gulp.src('./bower.json')
		.pipe(mainBowerFiles({
			"overrides": {
				"font-awesome": {
					"main": ['./css/font-awesome.min.css', './fonts/*.*']
				}
			}
		}))
		.pipe(plumber({
			errorHandler: error => {
				console.log(error.message);
				this.emit('end');
			}
		}))

		// JS
		.pipe(jsFilter)
		.pipe(concat('libs.js'))
		.pipe(rename({suffix: ".min"}))
		.pipe(uglify())
		.pipe(gulp.dest(gulp.paths.scriptsDest))
		.pipe(jsFilter.restore)

		//CSS
		.pipe(cssFilter)
		.pipe(cleanCss({compatibility: 'ie8'}))
		.pipe(concat('libs.min.css'))
		.pipe(gulp.dest(gulp.paths.stylesDest))
		.pipe(cssFilter.restore)

		// Fonts
		.pipe(fontFilter)
		.pipe(flatten())
		.pipe(gulp.dest(gulp.paths.fontsDest));
});
