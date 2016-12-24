# clefs-localstorage

A [clefs](https://npmjs.com/package/clefs) layer backed by
[localstorage-fs](https://npmjs.com/package/localstorage-fs).

![Clefs logo](http://doug-wade.github.io/clefs/img/logo.svg)


# Getting started

## Installing

```sh
npm i -S clefs clefs-fs
```

## Usage

```javascript
import clefs from 'clefs/browser';
import ClefFs from 'clefs-fs';

const fs = clefs([new ClefFs()]);
const fileContents = await fs.readFile('/path/to/file.txt');
console.log(fileContents);
```
