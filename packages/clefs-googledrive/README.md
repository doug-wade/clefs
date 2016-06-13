# clefs-googledrive

A [clefs](https://npmjs.com/package/clefs) layer.

![Clefs logo](http://doug-wade.github.io/clefs/img/logo.svg)

# Getting started

## Installing

		npm i -S clefs clefs-googledrive


## Usage

		import clefs from 'clefs';
		import googledrive from 'clefs-googledrive';

		const fs = clefs([simpleobject]);
		const fileContents = await fs.readFile('/path/to/file.txt');
		console.log(fileContents);
