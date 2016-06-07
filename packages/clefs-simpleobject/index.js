"use strict";

var fs = {};

module.exports = {
	writeFile: function writeFile(file, data) {
		return new Promise(function (resolve) {
			fs[file] = data;
			resolve();
		});
	},
	readFile: function readFile(file) {
		return new Promise(function (resolve, reject) {
			if (fs[file]) {
				resolve(fs[file]);
			} else {
				reject(new Error("file not found " + file));
			}
		});
	}
};
