export default class ClefsLocalStorage {
	constructor() {
		this.name = 'localstorage';
		this.fs = window.localStorage;
	}

	writeFile(file, data) {
		return new Promise(resolve => {
			this.fs.setItem(file, data);
			resolve();
		});
	}

	readFile(file) {
		return new Promise((resolve, reject) => {
			const contents = this.fs.getItem(file);
			if (contents) {
				resolve(contents);
			} else {
				reject(new Error(`file not found ${file}`));
			}
		});
	}

	access(file) {
		return new Promise((resolve, reject) => {
			if (this.fs.getItem(file)) {
				resolve();
			} else {
				reject(new Error(`file not found ${file}`));
			}
		});
	}
}
