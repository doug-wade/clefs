# clefs-simpleobject

A [clefs](https://npmjs.com/package/clefs) layer backed by
[localstorage-fs](https://npmjs.com/package/localstorage-fs).

![Clefs logo](http://doug-wade.github.io/clefs/img/logo.svg)

# Getting started

## Installing

```sh
npm i -S clefs clefs-simpleobject
```

## Usage

```javascript
import clefs from 'clefs/browser';
import simpleobject from 'clefs-simpleobject';

const fs = clefs([simpleobject]);
const fileContents = await fs.readFile('/path/to/file.txt');
console.log(fileContents);
```
