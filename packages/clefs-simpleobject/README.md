# clefs-simpleobject

A [clefs](https://npmjs.com/package/clefs) layer backed by
[localstorage-fs](https://npmjs.com/package/localstorage-fs).


# Getting started

## Installing

		npm i -S clefs clefs-simpleobject


## Usage

		import clefs from 'clefs/browser';
		import simpleobject from 'clefs-simpleobject';

		const fs = clefs([simpleobject]);
		const fileContents = await fs.readFile('/path/to/file.txt');
		console.log(fileContents);
