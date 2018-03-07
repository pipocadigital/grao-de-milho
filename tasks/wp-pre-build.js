const gulp = require('gulp');
const plumber = require('gulp-plumber');
const del = require('del');

gulp.task('wp-pre-build', function() {
	const gulpPaths = gulp.paths;
	const packageJson = gulp.config.packageJson;

	del([gulpPaths.themesWp + '*', '!' + gulpPaths.themesWp + packageJson.name, '!' + gulpPaths.themesWp + 'index.php']);
});
