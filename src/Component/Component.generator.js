import Generator from 'yeoman-generator';

export default class Component extends Generator {
  filename = 'component.js';

  prompting() {
    return this.prompt([{
      type: 'input',
      name: 'filename',
      message: 'Enter the Component filename:',
      default: this.filename,
    }]).then(({ filename }) => {
      this.filename = filename.endsWith('.js') ? filename : `${filename}.js`;
      this.config.set('componentFilename', this.filename);
    });
  }

  writing() {
    this.fs.copyTpl(this.templatePath('component.js'), this.destinationPath(this.filename));
  }
}
