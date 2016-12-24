# clefs

![Travis badge](https://travis-ci.org/doug-wade/clefs.svg?branch=master)

![Clefs logo](http://doug-wade.github.io/clefs/img/logo.svg)

A pluggable isomorphic file system abstraction

# Getting started

## Installing

Install the pluggable file system manager

```shell
npm i -S clefs
```

Then install as many layers as you'll need

```shell
npm i -S clefs-localstorage clefs-fs clefs-simpleobject
```


# Usage

## Node.js

```javascript
import clefs from 'clefs';
import ClefsFs from 'clefs-fs';
import ClefsSimpleObject from 'clefs-simpleobject';
import ClefsGoogleDrive from 'clefs-googledrive';

const fs = clefs([new ClefsSimpleObject(), new ClefsFs(), new ClefsGoogleDrive()]);
const fileContents = await fs.readFile('/path/to/file.txt');
console.log(fileContents);
```

## Browser

```javascript
import clefs from 'clefs/browser';
import ClefsLocalStorage from 'clefs-localstorage';
import ClefsSimpleObject from 'clefs-simpleobject';
import ClefsGoogleDrive from 'clefs-googledrive';

const fs = clefs([new ClefsSimpleObject(), new ClefsLocalStorage(), new ClefsGoogleDrive()]);
const fileContents = await fs.readFile('/path/to/file.txt');
console.log(fileContents);
```


# Roadmap

1. [clefs-dropbox](https://www.npmjs.com/package/dropbox)
1. [clefs-drive](https://www.npmjs.com/package/google-drive)
1. [clefs-box](https://www.npmjs.com/package/nodejs-box)
1. Browser tests
1. Support the full fs api


# Why clefs?

[Clefs](https://en.wikipedia.org/wiki/Clef) have layers.


# Sure, but why would _I_ use clefs?

Write through from a cache to a local file system or browser local storage
and to a cloud file storage provider with a single call.  Has a pleasant
promise-based interface that works nicely with async and await.


#### Special Thanks
Special thanks to [jonadab](https://openclipart.org/detail/36835/bass-clef-01)
for the creative commons licensed clef image.
