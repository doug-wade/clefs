const cp = require('child_process');
const {access, constants} = require('node:fs/promises');
const path = require('path');
const test = require('ava');
const helpers = require('yeoman-test');

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

		const results = await Promise.all(files.map(filename => {
			return exists(path.join(testDir, 'packages', `clefs-${testCase.name}`, filename));
		}));
		results.forEach(result => {
			t.true(result);
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
		const packagePath = path.join(testDir, 'packages', 'clefs-' + path.basename(testDir));
		await installDeps(packagePath);
		t.true(await runsSuccessfully('npm test', packagePath));
	});
});

function exists(filename) {
	try {
		access(filename, constants.R_OK | constants.W_OK);
		return true;
	} catch (error) {
		return false;
	}
}

function runsSuccessfully(command, dir) {
	return new Promise(resolve => {
		cp.exec(command, {
			cwd: dir
		}, error => {
			resolve(!error);
		});
	});
}

function installDeps(dir) {
	return new Promise((resolve, reject) => {
		cp.exec('npm install', {
			cwd: dir
		}, error => {
			if (error) {
				reject(error);
			} else {
				resolve();
			}
		});
	});
}
