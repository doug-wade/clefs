import fs from 'node:fs';

export default class ClefsFs {
	constructor() {
		this.name = 'fs';
	}

	access(file) {
		return new Promise((resolve, reject) => {
			fs.access(file, error => {
				if (error) {
					return reject(error);
				}

				resolve();
			});
		});
	}

	readFile(file) {
		return new Promise((resolve, reject) => {
			fs.readFile(file, (error, data) => {
				if (error) {
					return reject(error);
				}

				resolve(data.toString());
			});
		});
	}

	writeFile(file, data) {
		return new Promise((resolve, reject) => {
			fs.writeFile(file, data, error => {
				if (error) {
					return reject(error);
				}

				resolve();
			});
		});
	}
}
