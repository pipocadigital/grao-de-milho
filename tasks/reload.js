const gulp = require('gulp');
const browserSync = require('browser-sync');

gulp.task('reload', () => browserSync.reload());
