const gulp = require('gulp');
const plumber = require('gulp-plumber');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const sassLint = require('gulp-sass-lint');
const browserSync = require('browser-sync');

gulp.task('styles', function() {
	const {paths} = gulp;

	gulp.src(paths.styles)
		.pipe(plumber({
			errorHandler: error => {
				console.log(error.message);
				this.emit('end');
			}
		}))
		.pipe(sassLint({configFile: 'sass-lint.yml'}))
		.pipe(sassLint.format())
		.pipe(sassLint.failOnError())
		.pipe(sourcemaps.init())
		.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
		.pipe(rename({suffix: '.min'}))
		.pipe(autoprefixer(['last 2 versions', 'ie 8', 'ie 9', '> 1%']))
		.pipe(sourcemaps.write('.', {
			mapFile: mapFilePath => mapFilePath.replace('.js.map', '.map')
		}))
		.pipe(gulp.dest(paths.stylesDest))
		.pipe(browserSync.reload({stream: true}));

	gulp.src('src/style.css')
		.pipe(plumber({
			errorHandler: error => {
				console.log(error.message);
				this.emit('end');
			}
		}))
		.pipe(gulp.dest(paths.pagesDest));
});
