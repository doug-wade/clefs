# clefs-<%= name %>

A [clefs](https://npmjs.com/package/clefs) layer.

![Clefs logo](http://doug-wade.github.io/clefs/img/logo.svg)

# Getting started

## Installing

		npm i -S clefs clefs-<%= name %>


## Usage

		import clefs from 'clefs';
		import <%= name %> from 'clefs-<%= name %>';

		const fs = clefs([<%= name %>]);
		const fileContents = await fs.readFile('/path/to/file.txt');
		console.log(fileContents);
