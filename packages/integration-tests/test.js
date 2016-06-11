import clefs from 'clefs';
import path from 'path';
import simpleobject from 'clefs-simpleobject';
import clefsFs from 'clefs-fs';
import {cleanupTmpDir, createTmpDir} from './utils.js'
import test from 'ava';
import os from 'os';

const tmpDir = os.tmpdir();
let folder;
let layers = [simpleobject, clefsFs];

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

layers.forEach(layer => {
	test(`Reads and writes files with the ${layer.name} layer`, async t => {
		const expected = '# Hello World';
		const testPath = path.join(os.tmpdir(), 'tmp.md');
		const fs = clefs([simpleobject]);

		await fs.writeFile(testPath, expected);
		const actual = await fs.readFile(testPath);

		t.deepEqual(actual, expected);
	});
})

test("Reads and writes files with all layers", async t => {
	const expected = '# Hello World';
	const testPath = path.join(os.tmpdir(), 'tmp.md');
	const fs = clefs(layers);

	await fs.writeFile(testPath, expected);
	const actual = await fs.readFile(testPath);

	t.deepEqual(actual, [expected, expected]);
});

test.after.always(async () => {
	await cleanupTmpDir(folder);
})
