import Generator from 'yeoman-generator';

export default class Types extends Generator {
  filename = 'types.js';

  prompting() {
    return this.prompt([
      {
        type: 'input',
        name: 'filename',
        message: 'Enter the Types filename:',
        default: this.filename,
      },
    ]).then(({ filename }) => {
      this.filename = filename.endsWith('.js') ? filename : `${filename}.js`;
      this.config.set('typesFilename', this.filename);
    });
  }

  writing() {
    this.fs.copyTpl(this.templatePath('types.js'), this.destinationPath(this.filename));
  }
}
