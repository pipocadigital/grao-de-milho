const util = require('util');
const gulp = require('gulp');
const shell = require('gulp-shell');
const prompt = require('gulp-prompt');
const header = require('gulp-header');
const mysqldump = require('mysqldump');
const replace = require('gulp-string-replace');

const SQL_FOLDER = './db/';
const SQL_FILE = `${SQL_FOLDER}data.sql`;

gulp.task('mysql:export', function() {
	gulp.src('').pipe(
		prompt.prompt([{
			type: 'input',
			name: 'host',
			message: 'Host'
		}, {
			type: 'input',
			name: 'user',
			message: 'User'
		}, {
			type: 'password',
			name: 'password',
			message: 'Password'
		}, {
			type: 'input',
			name: 'database',
			message: 'Database name'
		}], function(response) {
			const {host, user, password, database} = response;

			mysqldump({
				connection: {host, user, password, database},
				dumpToFile: SQL_FILE
			}).then(() => console.log('Dump exportado com sucesso!'));
		})
	);
});

gulp.task('mysql:replaceurl', function() {
	gulp.src('').pipe(
		prompt.prompt([{
			type: 'input',
			name: 'from',
			message: 'URL'
		}, {
			type: 'input',
			name: 'to',
			message: 'New URL',
			default: 'http://localhost:3838'
		}], function(response) {
			const {from, to} = response;

			if (to !== from) {
				gulp.src(SQL_FILE)
					.pipe(replace(from, to))
					.pipe(gulp.dest(SQL_FOLDER))
			}
		})
	);
});

gulp.task('mysql:import', function() {
	gulp.src('').pipe(
		prompt.prompt([{
			type: 'input',
			name: 'host',
			message: 'Host'
		}, {
			type: 'input',
			name: 'username',
			message: 'User'
		}, {
			type: 'password',
			name: 'password',
			message: 'Password'
		}, {
			type: 'input',
			name: 'database',
			message: 'Database'
		}], function(response, err) {
			let loginMysql = util.format('mysql -u %s -h %s', response.username, response.host);

			if (response.password !== '') {
				loginMysql = util.format('mysql -u %s -p%s -h %s', response.username, response.password, response.host)
			}

			const shellCommand = util.format("%s -e 'DROP DATABASE %s; CREATE DATABASE %s CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;' && %s %s < " + SQL_FILE, loginMysql, response.database, response.database, loginMysql, response.database)

			gulp.src('')
				.pipe(shell([shellCommand]));

			console.log('Dump importado com sucesso!');
		})
	);
});
