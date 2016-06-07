# clefs

A pluggable isomorphic file system abstraction

# Getting started

## Installing

		npm i -S clefs localstorage-fs

## Node.js

		import clefs from 'clefs';
		import clefsFs from 'clefs-fs';

		const fs = clefs([clefsFs]);

## Browser

		import clefs from 'clefs/browser';
		import localstorage from 'clefs-localstorage';

		const fs = clefs([localstorage]);


# Usage

		const fileContents = await fs.readFile('/path/to/file.txt');
		console.log(fileContents);


# Roadmap

1. [dropbox-fs](https://www.npmjs.com/package/dropbox)
1. [drive-fs](https://www.npmjs.com/package/google-drive)
1. [box-fs](https://www.npmjs.com/package/nodejs-box)


# Why clefs?

[Clefs](https://en.wikipedia.org/wiki/Clef) have layers.


# Sure whatever, but why would I use clefs?

Write through from a local file system or local storage to a cloud file storage
provider.  Has a pleasant promise-based interface that works nicely with async
and await.
