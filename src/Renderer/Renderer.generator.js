import Generator from 'yeoman-generator';
import _ from 'lodash';

export default class Renderer extends Generator {
  enabled = true;
  renderer = 'CustomRenderer';
  filename = 'renderer.js'

  constructor(args, opts) {
    super(args, opts);
    const required = !opts.composite;
    this.argument('typesFilename', { type: String, required });
    this.argument('componentFilename', { type: String, required });
  }

  prompting() {
    return this.prompt([
      {
        type: 'input',
        name: 'renderer',
        message: 'Enter the Renderer name:',
        default: this.renderer,
      },
      {
        type: 'input',
        name: 'filename',
        message: 'Enter the Renderer filename:',
        default: this.filename,
      },
    ]).then(({ renderer, filename }) => {
      this.renderer = _.upperFirst(_.camelCase(renderer));
      this.filename = filename.endsWith('.js') ? filename : `${filename}.js`;
      this.config.set('renderer', this.renderer);
      this.config.set('rendererFilename', this.filename);
    });
  }

  writing() {
    const typesFilename = this.options.typesFilename || this.config.get('typesFilename');
    const componentFilename = this.options.componentFilename || this.config.get('componentFilename');
    this.fs.copyTpl(
      this.templatePath('renderer.js'),
      this.destinationPath(this.filename),
      {
        renderer: this.renderer,
        typesResolve: typesFilename.slice(0, -3),
        componentResolve: componentFilename.slice(0, -3),
      },
    );
  }
}
