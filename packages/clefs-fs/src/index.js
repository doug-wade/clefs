import fs from 'fs';

export default class ClefsFs {
	constructor() {
		this.name = 'fs';
	}

	readFile(file) {
		return new Promise((resolve, reject) => {
			fs.readFile(file, (err, data) => {
				if (err) {
					return reject(err);
				}
				resolve(data.toString());
			});
		});
	}

	writeFile(file, data) {
		return new Promise((resolve, reject) => {
			fs.writeFile(file, data, err => {
				if (err) {
					return reject(err);
				}
				resolve();
			});
		});
	}
}
