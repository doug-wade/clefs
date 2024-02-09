'use strict';
const path = require('path');
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class ClefsGenerator extends Generator {
	prompting() {
		const _this = this;
		_this.log(yosay(
			'Welcome to the shining ' + chalk.green('clefs plugin') + ' generator!'
		));

		const prompts = [{
			type: 'input',
			name: 'name',
			message: 'What would you like to call your plugin?',
			default: this.appname
		}];

		return _this.prompt(prompts).then(props => {
			if (props.name.startsWith('clefs-')) {
				props.name = props.name.replace('clefs-', '');
			}
			_this.props = props;
		});
	}

	writing() {
		const _this = this;

		const files = [
			'src/index.js',
			'.babelrc',
			'.gitignore',
			'.npmignore',
			'package.json',
			'README.md'
		];

		files.forEach(filename => {
			_this.fs.copyTpl(
				_this.templatePath(filename),
				_this.destinationPath(path.join('packages', 'clefs-' + _this.props.name, filename)),
				_this.props
			);
		});
	}

	install() {
		this.npmInstall();
	}
};
