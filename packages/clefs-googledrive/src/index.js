import {GoogleAuth} from 'google-auth-library';
import {drive_v3 as drive} from '@googleapis/drive';

export default class ClefsGoogleDrive {
	constructor() {
		this.name = 'googledrive';

		this.authPromise = new GoogleAuth({
			scopes: [
				'https://www.googleapis.com/auth/drive',
				'https://www.googleapis.com/auth/drive.appdata',
				'https://www.googleapis.com/auth/drive.file',
				'https://www.googleapis.com/auth/drive.metadata',
				'https://www.googleapis.com/auth/drive.metadata.readonly',
				'https://www.googleapis.com/auth/drive.photos.readonly',
				'https://www.googleapis.com/auth/drive.readonly',
			],
		}).then(auth => {
			google.options({auth});
		});
	}

	async writeFile(file, data) {
		await this.authPromise;

		return drive.files.create(
			{
				name: file,
				media: {
					body: new ReadableStream(data),
				},
			},
		);
	}

	async readFile(file) {
		await this.authPromise;

		return drive.files
			.get({file, alt: 'media'}, {responseType: 'stream'})
			.then(res => {
				return new Promise((resolve, reject) => {
					let buffer = '';

					res.data
					.on('end', () => {
						resolve(buffer);
					})
					.on('error', err => {
						reject(err);
					})
					.on('data', d => {
						buffer += d;
					})
					.catch(error => {
						reject(error);
					});
				});
			});
	}
}
