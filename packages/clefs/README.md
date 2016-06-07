# clefs

![Clefs logo](http://doug-wade.github.io/clefs/img/logo.svg)

A pluggable isomorphic file system abstraction

# Getting started

## Installing

```shell
npm i -S clefs localstorage-fs
```

## Node.js

```javascript
import clefs from 'clefs';
import clefsFs from 'clefs-fs';

const fs = clefs([clefsFs]);
```

## Browser

```javascript
import clefs from 'clefs/browser';
import localstorage from 'clefs-localstorage';

const fs = clefs([localstorage]);
```


# Usage

```javascript
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

Write through from a local file system or local storage to a cloud file storage
provider.  Has a pleasant promise-based interface that works nicely with async
and await.


#### Special Thanks
Special thanks to [jonadab](https://openclipart.org/detail/36835/bass-clef-01)
for the creative commons licensed clef image.
