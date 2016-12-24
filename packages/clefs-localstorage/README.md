# clefs-localstorage

A [clefs](https://npmjs.com/package/clefs) layer backed by
[localstorage-fs](https://npmjs.com/package/localstorage-fs).


# Getting started

## Installing

```sh
npm i -S clefs clefs-localstorage
```

## Usage

```javascript
import clefs from 'clefs/browser';
import ClefsLocalStorage from 'clefs-localstorage';

const fs = clefs([new ClefsLocalStorage()]);
const fileContents = await fs.readFile('/path/to/file.txt');
console.log(fileContents);
```
