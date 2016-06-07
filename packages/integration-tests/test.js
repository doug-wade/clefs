import clefs from '../clefs';
import path from 'path';
import simpleobject from '../clefs-simpleobject';
import clefsFs from '../clefs-fs';
import {cleanupTmpDir, createTmpDir} from '../../test.js'
import test from 'ava';
import os from 'os';

const tmpDir = os.tmpdir();
let folder;

test.before(async () => {
	folder = await createTmpDir();
});

test("Throws on unsupported method", async t => {
	const fs = clefs([simpleobject]);

	try {
		fs.renegade('foo', 'bar');
		t.fail();
	} catch (e) {
		t.pass();
	}
});

test("Reads and writes files with one layer", async t => {
	const expected = '# Hello World';
	const testPath = path.join(os.tmpdir(), 'tmp.md');
	const fs = clefs([simpleobject]);

	await fs.writeFile(testPath, expected);
	const actual = await fs.readFile(testPath);

	t.deepEqual(actual, expected);
});

test("Reads and writes files with two layers", async t => {
	const expected = '# Hello World';
	const testPath = path.join(os.tmpdir(), 'tmp.md');
	const fs = clefs([simpleobject, clefsFs]);

	await fs.writeFile(testPath, expected);
	const actual = await fs.readFile(testPath);

	t.deepEqual(actual, [expected, expected]);
});

test.after.always(async () => {
	await cleanupTmpDir(folder);
})
