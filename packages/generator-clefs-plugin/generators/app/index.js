'use strict';
const path = require('path');
const yeoman = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = yeoman.Base.extend({
	prompting: function () {
		let _this = this;
		_this.log(yosay(
			'Welcome to the shining ' + chalk.green('clefs plugin') + ' generator!'
		));

		let prompts = [{
			type: 'input',
			name: 'name',
			message: 'What would you like to call your plugin?',
			default: this.appname
		}];

		return _this.prompt(prompts).then((props) => {
			if (props.name.startsWith('clefs-')) {
				props.name = props.name.replace('clefs-', '');
			}
			_this.props = props;
		});
	},

	writing: function () {
		let _this = this;

		let files = [
			'src/index.js',
			'.babelrc',
			'.gitignore',
			'.npmignore',
			'package.json',
			'README.md'
		];

		files.forEach((filename) => {
			_this.fs.copyTpl(
				_this.templatePath(filename),
				_this.destinationPath(path.join('packages', 'clefs-' + _this.props.name, filename)),
				_this.props
			);
		});
	},

	install: function () {
		this.npmInstall();
	}
});
