import Generator from 'yeoman-generator';

export default class Module extends Generator {
  enabled = true;
  module = 'Custom';

  constructor(args, opts) {
    super(args, opts);
    const required = !opts.composite;
    this.argument('renderer', { type: String, required });
    this.argument('rendererFilename', { type: String, required });
    this.argument('typesFilename', { type: String, required });
    this.argument('container', { type: String, required });
    this.argument('containerFilename', { type: String, required });
  }

  prompting() {
    this.renderer = this.options.renderer || this.config.get('renderer');
    this.rendererFilename = this.options.rendererFilename || this.config.get('rendererFilename');
    this.typesFilename = this.options.typesFilename || this.config.get('typesFilename');
    return this.prompt([
      {
        type: 'confirm',
        name: 'enabled',
        message: 'Do you want to organize scripts as a module?',
        default: this.enabled,
        when: typeof this.renderer === 'string' && typeof this.rendererFilename === 'string',
      },
      {
        type: 'input',
        name: 'module',
        message: 'Enter the module name:',
        default: this.module,
        when: ({ enabled }) => enabled,
      },
    ]).then(({ enabled, module }) => {
      this.enabled = enabled;
      this.module = module;
    });
  }

  writing() {
    if (this.enabled) {
      const container = this.options.container || this.config.get('container');
      const containerFilename = this.options.containerFilename || this.config.get('containerFilename');
      this.fs.copyTpl(
        this.templatePath('index.js'),
        this.destinationPath(`${this.module}/index.js`),
        {
          renderer: this.renderer,
          rendererResolve: this.rendererFilename.slice(0, -3),
          typesResolve: this.typesFilename.slice(0, -3),
          container,
          containerResolve: containerFilename ? containerFilename.slice(0, -3) : false,
        },
      );
      this.fs.move(this.destinationPath(this.typesFilename), this.destinationPath(`${this.module}/${this.typesFilename}`));
      this.fs.move(this.destinationPath(this.rendererFilename), this.destinationPath(`${this.module}/${this.rendererFilename}`));
      if (containerFilename) {
        this.fs.move(this.destinationPath(containerFilename), this.destinationPath(`${this.module}/${containerFilename}`));
      }
    }
  }
}
