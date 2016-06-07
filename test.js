const fs = require('fs');
const os = require('os');
const path = require('path');
const del = require('del');

// Testing utilities
function createTmpDir() {
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

function cleanupTmpDir(dir) {
	// In case the cleanup regex matches more than one directory, clean up arrays.
	let directories = [];
	if (typeof dir === 'string') {
		directories = [dir];
	}
	const promises = [];
	directories.forEach(directory => {
		promises.push(del(directory, {force: true}));
	});
	return Promise.all(promises);
}

function generateRandomId() {
	return (Math.floor(Math.random() * 9999999) + 1000000).toString();
}

module.exports = {cleanupTmpDir, createTmpDir};
