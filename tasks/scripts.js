const gulp = require('gulp');
const iife = require("gulp-iife");
const babel = require('gulp-babel');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const jshint = require('gulp-jshint');
const plumber = require('gulp-plumber');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync');

gulp.task('scripts', function() {
	return gulp.src(gulp.paths.scripts)
		.pipe(plumber({
			errorHandler: error => {
				console.log(error.message);
				this.emit('end');
			}
		}))
		.pipe(jshint({
			maxerr: 50,
			jquery: '$',
			esversion: 6
		}))
		.pipe(jshint.reporter('default'))
		.pipe(sourcemaps.init())
		.pipe(babel({
			presets: ['es2015']
		}))
		.pipe(iife())
		.pipe(concat('main.js'))
		.pipe(uglify())
		.pipe(rename({suffix: '.min'}))
		.pipe(sourcemaps.write('.', {
			mapFile: mapFilePath => mapFilePath.replace('.js.map', '.map')
		}))
		.pipe(gulp.dest(gulp.paths.scriptsDest))
		.pipe(browserSync.reload({stream: true}))
});
