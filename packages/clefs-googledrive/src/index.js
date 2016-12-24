const fs = {};

export default class ClefsGoogleDrive {
	constructor() {
		this.name = 'googledrive';
	}

	writeFile(file, data) {
		return new Promise(resolve => {
			fs[file] = data;
			resolve();
		});
	}

	readFile(file) {
		return new Promise((resolve, reject) => {
			if (fs[file]) {
				resolve(fs[file]);
			} else {
				reject(new Error(`file not found ${file}`));
			}
		});
	}
}
