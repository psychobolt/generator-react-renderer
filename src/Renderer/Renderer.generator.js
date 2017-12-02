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
  }

  prompting() {
    this.typesFilename = this.options.typesFilename || this.config.get('typesFilename');
    this.enabled = typeof this.typesFilename === 'string';
    return this.prompt([
      {
        type: 'input',
        name: 'renderer',
        message: 'Enter the Renderer name:',
        default: this.renderer,
        when: this.enabled,
      },
      {
        type: 'input',
        name: 'filename',
        message: 'Enter the Renderer filename:',
        default: this.filename,
      },
    ]).then(({ renderer, filename }) => {
      if (this.enabled) {
        this.renderer = _.upperFirst(_.camelCase(renderer));
        this.filename = filename.endsWith('.js') ? filename : `${filename}.js`;
        this.config.set('renderer', this.renderer);
        this.config.set('rendererFilename', this.filename);
      }
    });
  }

  writing() {
    if (this.enabled) {
      this.fs.copyTpl(
        this.templatePath('renderer.js'),
        this.destinationPath(this.filename),
        {
          renderer: this.renderer,
          typesResolve: this.typesFilename.slice(0, -3),
        },
      );
    }
  }
}
