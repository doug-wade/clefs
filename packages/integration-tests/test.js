import os from 'node:os';
import path from 'node:path';
import test from 'ava';
import clefs from 'clefs';
import ClefsFs from 'clefs-fs';
import ClefsLocalStorage from 'clefs-localstorage';
import ClefsSimpleObject from 'clefs-simpleobject';
import {cleanupTemporaryDirectory, createTemporaryDirectory, FailingPlugin} from './utils.js';
// Mock local storage per https://www.npmjs.com/package/mock-local-storage
// This makes the linter vvvvv mad, so we have to disable a lot of rules.
global.window = {};
// eslint-disable-next-line import/first, import/order, import/newline-after-import, import/no-unassigned-import
import 'mock-local-storage';
global.window.localStorage = global.localStorage;

let folder;
test.before(async () => {
	folder = await createTemporaryDirectory();
});

test.after.always(async () => {
	await cleanupTemporaryDirectory(folder);
});

test('Throws on unsupported method', t => {
	const fs = clefs([new ClefsSimpleObject(), new ClefsFs(), new ClefsLocalStorage()]);

	const error = t.throws(() => {
		fs.renegade('foo', 'bar');
	}, {instanceOf: TypeError});

	t.is(error.message, 'fs.renegade is not a function');
});

test('Writes and reads files', async t => {
	const expected = '# Hello World';
	const testPath = path.join(os.tmpdir(), 'tmp.md');
	const fs = clefs([new ClefsSimpleObject(), new ClefsFs(), new ClefsLocalStorage()]);

	await fs.writeFile(testPath, expected);
	const actual = await fs.readFile(testPath);

	t.deepEqual(actual, expected);
});

test('Writes and accesses files', async t => {
	const testPath = path.join(os.tmpdir(), 'tmp.md');
	const fs = clefs([new ClefsSimpleObject(), new ClefsFs(), new ClefsLocalStorage()]);

	await fs.writeFile(testPath, '# Hello World');
	await fs.access(testPath);

	t.is(global.localStorage.length, 1);
});

test('Write fails if one layer fails', async t => {
	const testPath = path.join(os.tmpdir(), 'tmp.md');
	const fs = clefs([new ClefsSimpleObject(), new ClefsFs(), new ClefsLocalStorage(), new FailingPlugin()]);

	const error = await t.throwsAsync(async () => {
		await fs.writeFile(testPath, '# Hello World');
	});

	t.is(error.message, 'writeFile failed');
});

test('Read succeeds if one layer fails', async t => {
	const expected = '# Hello World';
	const testPath = path.join(os.tmpdir(), 'tmp.md');
	const simpleObjectPlugin = new ClefsSimpleObject();
	simpleObjectPlugin.writeFile(testPath, expected);

	const fs = clefs([simpleObjectPlugin, new ClefsFs(), new ClefsLocalStorage(), new FailingPlugin()]);
	const actual = await fs.readFile(testPath);

	t.deepEqual(actual, expected);
});
