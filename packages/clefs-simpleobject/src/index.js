export default class ClefsSimpleObject {
	constructor(fs) {
		this.name = 'simpleobject';
		this.fs = fs || {};
	}

	writeFile(file, data) {
		return new Promise(resolve => {
			this.fs[file] = data;
			resolve();
		});
	}

	readFile(file) {
		return new Promise((resolve, reject) => {
			if (this.fs[file]) {
				resolve(this.fs[file]);
			} else {
				reject(new Error(`file not found ${file}`));
			}
		});
	}

	access(file) {
		return new Promise((resolve, reject) => {
			if (this.fs[file]) {
				resolve();
			} else {
				reject(new Error(`file not found ${file}`));
			}
		});
	}
}
