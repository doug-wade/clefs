# Contributing to clefs

If you'd like to submit an issue, do it!  Don't be shy!

If you want to add a plugin, feel free to submit it as a pr or to publish your
own in your own repo.  If you'd like to do that, you could also send me a pr to
add something to the docs in the monorepo to make it more discoverable.

Don't be a jerk.

# Adding a new layer

Layers should be a new package with a name in the form clefs-$name, and should
export from their `main` file an object with the following shape

```javascript
module.exports = {
	writeFile(file, data) { return new Promise() },
	readFile(file) { return new Promise() },
	name: '$name'`
}
```
