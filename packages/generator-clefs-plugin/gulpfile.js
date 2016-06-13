'use strict';
var path = require('path');
var gulp = require('gulp');
var ava = require('gulp-ava');
var xo = require('gulp-xo');
var nsp = require('gulp-nsp');
var plumber = require('gulp-plumber');
var coveralls = require('gulp-coveralls');

gulp.task('static', function () {
	return gulp.src('generators/app/index.js')
							.pipe(xo({
								esnext: true
							}));
});

gulp.task('nsp', function (cb) {
	nsp({package: path.resolve('package.json')}, cb);
});

gulp.task('test', function (cb) {
	var avaErr;

	gulp.src('test/**/*.js')
			.pipe(plumber())
			.pipe(ava())
			.on('error', function (err) {
				avaErr = err;
			})
			.on('end', function () {
				cb(avaErr);
			});
});

gulp.task('watch', function () {
	gulp.watch(['generators/**/*.js', 'test/**'], ['test']);
});

gulp.task('coveralls', ['test'], function () {
	if (!process.env.CI) {
		return;
	}

	return gulp.src(path.join(__dirname, 'coverage/lcov.info'))
							.pipe(coveralls());
});

gulp.task('prepublish', ['nsp']);
gulp.task('default', ['static', 'test', 'coveralls']);
