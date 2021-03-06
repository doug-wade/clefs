'use strict';
var path = require('path');
var gulp = require('gulp');
var ava = require('gulp-ava');
var xo = require('gulp-xo');
var snyk = require('gulp-snyk');
var plumber = require('gulp-plumber');
var codecov = require('gulp-codecov');

gulp.task('xo', function () {
	return gulp.src('generators/app/index.js')
							.pipe(xo({
								esnext: true
							}));
});

gulp.task('snyk-protect', function (cb) {
	return snyk({command: 'protect'}, cb);
});

gulp.task('snyk-test', function (cb) {
	return snyk({command: 'test'}, cb);
});

gulp.task('ava', function (cb) {
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

gulp.task('coverage', function () {
	gulp.src('./coverage/lcov.info')
	    .pipe(codecov());
});

gulp.task('test', ['xo', 'ava', 'snyk-test']);
gulp.task('prepublish', ['snyk-protect']);

gulp.task('default', ['prepublish', 'test']);
