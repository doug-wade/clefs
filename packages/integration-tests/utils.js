import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {deleteAsync} from 'del';

// Testing utilities
export function createTemporaryDirectory() {
	const randomId = generateRandomId();

	return new Promise((resolve, reject) => {
		const temporaryPath = path.join(os.tmpdir(), 'clefs-fixture-' + randomId);
		fs.mkdir(temporaryPath, error => {
			if (error) {
				reject(error);
			} else {
				resolve(temporaryPath);
			}
		});
	});
}

export function cleanupTemporaryDirectory(directory) {
	// In case the cleanup regex matches more than one directory, clean up arrays.
	let directories = [];
	if (typeof directory === 'string') {
		directories = [directory];
	}

	return Promise.all(directories.map(
		directory => deleteAsync(directory, {force: true}),
	));
}

export function generateRandomId() {
	return (Math.floor(Math.random() * 9_999_999) + 1_000_000).toString();
}

export class FailingPlugin {
	constructor() {
		this.name = 'failing';
	}

	readFile() {
		return Promise.reject(new Error('readFile failed'));
	}

	writeFile() {
		return Promise.reject(new Error('writeFile failed'));
	}

	access() {
		return Promise.reject(new Error('access failed'));
	}
}
