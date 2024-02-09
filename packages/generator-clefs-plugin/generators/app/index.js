import path from 'node:path';
import Generator from 'yeoman-generator';
import chalk from 'chalk';
import yosay from 'yosay';

export default class ClefsGenerator extends Generator {
	prompting() {
		this.log(yosay(
			'Welcome to the ' + chalk.green('clefs plugin') + ' generator!',
		));

		const prompts = [{
			type: 'input',
			name: 'name',
			message: 'What would you like to call your plugin?',
			default: this.appname,
		}];

		return this.prompt(prompts).then(properties => {
			if (properties.name.startsWith('clefs-')) {
				properties.name = properties.name.replace('clefs-', '');
			}

			this.props = properties;
		});
	}

	writing() {
		const files = [
			'src/index.js',
			'.babelrc',
			'.gitignore',
			'.npmignore',
			'package.json',
			'README.md',
		];

		for (const filename of files) {
			this.fs.copyTpl(
				this.templatePath(filename),
				this.destinationPath(path.join('packages', 'clefs-' + this.props.name, filename)),
				this.props,
			);
		}
	}
}
