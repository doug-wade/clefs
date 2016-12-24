# clefs-googledrive

A [clefs](https://npmjs.com/package/clefs) layer.

![Clefs logo](http://doug-wade.github.io/clefs/img/logo.svg)

# Getting started

## Installing

```sh
npm i -S clefs clefs-googledrive
```

## Usage

```javascript
import clefs from 'clefs';
import ClefsGoogleDrive from 'clefs-googledrive';

const fs = clefs([new ClefsGoogledrive()]);
const fileContents = await fs.readFile('/path/to/file.txt');
console.log(fileContents);
```
