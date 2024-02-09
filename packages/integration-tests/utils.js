import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {deleteAsync} from 'del';

// Testing utilities
export function createTmpDir() {
	const randomId = generateRandomId();

	return new Promise((resolve, reject) => {
		const tmpPath = path.join(os.tmpdir(), 'clefs-fixture-' + randomId);
		fs.mkdir(tmpPath, (err) => {
			if (err) {
				reject(err);
			} else {
				resolve(tmpPath);
			}
		});
	});
}

export function cleanupTmpDir(dir) {
	// In case the cleanup regex matches more than one directory, clean up arrays.
	let directories = [];
	if (typeof dir === 'string') {
		directories = [dir];
	}
	const promises = [];
	directories.forEach(directory => {
		promises.push(deleteAsync(directory, {force: true}));
	});
	return Promise.all(promises);
}

export function generateRandomId() {
	return (Math.floor(Math.random() * 9999999) + 1000000).toString();
}
