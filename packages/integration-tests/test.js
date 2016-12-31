import clefs from 'clefs';
import path from 'path';
import ClefsSimpleObject from 'clefs-simpleobject';
import ClefsFs from 'clefs-fs';
import ClefsGoogleDrive from 'clefs-googledrive';
import {cleanupTmpDir, createTmpDir} from './utils.js';
import test from 'ava';
import os from 'os';
import gda from './google-drive-auth.js';

const tmpDir = os.tmpdir();
let folder;
let layers;

test.before(async () => {
	folder = await createTmpDir();
	const gauth = await gda();
	layers = [new ClefsSimpleObject(), new ClefsFs(), new ClefsGoogleDrive(gauth)];
});

test("Throws on unsupported method", async t => {
	const fs = clefs([new ClefsSimpleObject()]);

	try {
		fs.renegade('foo', 'bar');
		t.fail();
	} catch (e) {
		t.pass();
	}
});

test(`Reads and writes files with each layer`, async t => {
	t.plan(layers.length);
	layers.forEach(async layer => {
		const expected = '# Hello World';
		const testPath = path.join(os.tmpdir(), 'tmp.md');
		const fs = clefs([new ClefsSimpleObject()]);

		await fs.writeFile(testPath, expected);
		const actual = await fs.readFile(testPath);

		t.deepEqual(actual, expected);
	});
});

test("Reads and writes files with all layers", async t => {
	const expected = '# Hello World';
	const testPath = path.join(os.tmpdir(), 'tmp.md');
	const fs = clefs(layers);

	await fs.writeFile(testPath, expected);
	const actual = await fs.readFile(testPath);

	t.deepEqual(actual, expected);
});

test.after.always(async () => {
	await cleanupTmpDir(folder);
})
