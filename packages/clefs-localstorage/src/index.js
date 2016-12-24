import promisify from 'promisify-node';

const lsfs = promisify('localstorage-fs');

export default class ClefsLocalStorage {
	constructor() {
		this.name = 'localstorage';
		this.writeFile = lsfs.writeFile;
		this.readFile = lsfs.readFile;
	}
}
