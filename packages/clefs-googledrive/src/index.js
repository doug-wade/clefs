import google from 'googleapis';

export default class ClefsGoogleDrive {
	constructor({auth}) {
		this.name = 'googledrive';
		this.fs = google.drive({version: 'v3', auth});
		this.auth = auth;
	}

	writeFile(name, body) {
		return new Promise((resolve, reject) => {
			this.fs.files.create({
				resource: {
					name,
					mimeType: 'text/plain'
				},
				media: {
					body,
					mimeType: 'text/plain'
				}
			}, arg => {
				if (arg instanceof Error) {
					reject(arg);
				}
				resolve(arg);
			});
		});
	}

	readFile(file) {
		return new Promise((resolve, reject) => {
			this.fs.files.list({
				pageSize: 10,
				fields: 'nextPageToken, files(id, name)'
			}, (err, response) => {
				if (err) {
					reject(err);
				}
				var files = response.files;
				if (files.length === 0) {
					reject(new Error(`file not found ${file}`));
				} else {
					files.forEach(file => {
						if (files.name === file) {
							this.fs.files.get({fileId: file.id}, arg => {
								if (arg instanceof Error) {
									reject(arg);
								}
								resolve(arg);
							});
						}
					});
					reject(new Error(`file not found ${file}`));
				}
			});
		});
	}
}
