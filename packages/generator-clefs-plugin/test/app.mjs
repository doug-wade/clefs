import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';
import test from 'ava';
import assert from 'yeoman-assert';
import helpers from 'yeoman-test';

const __dirname = dirname(fileURLToPath(import.meta.url));

const files = [
	'src/index.js',
	'.babelrc',
	'.gitignore',
	'.npmignore',
	'README.md',
	'package.json',
];

test('generator-clefs-plugin:app creates files', async t => {
	const name = 'box';
	await helpers
		.run(join(__dirname, '../generators/app'))
		.withPrompts({name})
		.toPromise();

	try {
		assert.file(files.map(filename => join('packages', `clefs-${name}`, filename)));
		t.pass();
	} catch (error) {
		t.fail(`${error.message}`);
	}
});
