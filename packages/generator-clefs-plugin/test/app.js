import cp from 'child_process';
import fs from 'fs';
import path from 'path';
import test from 'ava';
import helpers from 'yeoman-test';

const files = [
	'src/index.js',

	'.babelrc',
	'.gitignore',
	'.npmignore',
	'README.md',
	'package.json'
];

const testCases = [{
	name: 'test'
}];

testCases.forEach(testCase => {
	test(`generator-react-server:app ${testCase.name} creates files`, async t => {
		let testDir;
		await helpers.run(path.join(__dirname, '../generators/app'))
			.inTmpDir(dir => {
				testDir = dir;
			})
			.withPrompts(testCase)
			.toPromise();

		t.expect(files.length);
		files.forEach(file => {
			t.true(await exists(file, testDir));
		});
	});

	test(`generator-react-server:app ${testCase.name} passes the test target`, async t => {
		let testDir;
		await helpers.run(path.join(__dirname, '../generators/app'))
			.inTmpDir(dir => {
				testDir = dir;
			})
			.withPrompts(testCases)
			.toPromise();
		await installDeps();
		t.true(await runsSuccessfully('npm test', testDir));
	});
});

function exists(filename, dir) {
	filename = path.join(dir, filename);
	return new Promise((resolve) => {
		fs.access(filename, fs.F_OK, (err) => {
			resolve(!err);
		});
	});
}

function runsSuccessfully(command, dir) {
	return new Promise((resolve) => {
		cp.exec(command, {
			cwd: dir
		}, (error) => {
			resolve(!error);
		});
	});
}

function installDeps() {
	return new Promise((resolve, reject) => {
		cp.exec('npm install', (error) => {
			if (error) {
				reject(error);
			} else {
				resolve();
			}
		});
	});
}
