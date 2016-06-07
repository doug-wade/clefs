# clefs-localstorage

A [clefs](https://npmjs.com/package/clefs) layer backed by
[localstorage-fs](https://npmjs.com/package/localstorage-fs).


# Getting started

## Installing

		npm i -S clefs clefs-localstorage


## Usage

		import clefs from 'clefs/browser';
		import localstorage from 'clefs-localstorage';

		const fs = clefs([localstorage]);
		const fileContents = await fs.readFile('/path/to/file.txt');
		console.log(fileContents);
