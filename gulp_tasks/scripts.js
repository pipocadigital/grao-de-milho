var gulp            = require('gulp'),
    plumber         = require('gulp-plumber'),
    rename          = require('gulp-rename'),
    uglify          = require('gulp-uglify'),
    concat          = require('gulp-concat'),
    sourcemaps      = require('gulp-sourcemaps'),
    jshint  	  	  = require('gulp-jshint'),
    babel 					= require('gulp-babel'),
    browserSync  	  = require('browser-sync');

// Scripts
gulp.task('scripts', function() {
	return gulp.src(gulp.paths.scripts)
		.pipe(plumber({
			errorHandler: function(error) {
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
		.pipe(concat('main.js'))
		.pipe(uglify())
		.pipe(rename({suffix: '.min'}))
		.pipe(sourcemaps.write('.', {
			mapFile: function(mapFilePath) {
				return mapFilePath.replace('.js.map', '.map');
			}
		}))
		.pipe(gulp.dest(gulp.paths.scriptsDest))
		.pipe(browserSync.reload({stream: true}))
});
