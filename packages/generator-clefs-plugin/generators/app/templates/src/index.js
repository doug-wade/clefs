const fs = {};

const plugin = {
	writeFile(file, data) {
		return new Promise(resolve => {
			fs[file] = data;
			resolve();
		});
	},
	readFile(file) {
		return new Promise((resolve, reject) => {
			if (fs[file]) {
				resolve(fs[file]);
			} else {
				reject(new Error(`file not found ${file}`));
			}
		});
	},
	access(file) {
		return new Promise((resolve, reject) => {
			if (fs[file]) {
				resolve();
			} else {
				reject(new Error(`file not found ${file}`));
			}
		});
	},
	name: '<%= name %>',
};

export default plugin;
