import Generator from 'yeoman-generator';
import _ from 'lodash';

export default class Provider extends Generator {
  enabled = false;
  provider = 'CustomProvider';
  filename = 'provider.js';

  constructor(args, opts) {
    super(args, opts);
    const required = !opts.composite;
    this.argument('renderer', { type: String, required });
    this.argument('rendererFilename', { type: String, required });
    this.argument('typesFilename', { type: String, required });
  }

  prompting() {
    this.renderer = this.options.renderer || this.config.get('renderer');
    this.rendererFilename = this.options.rendererFilename || this.config.get('rendererFilename');
    return this.prompt([
      {
        type: 'confirm',
        name: 'enabled',
        message: 'Do you want to generate a Context Provider?',
        default: this.enabled,
        when: this.options.composite === true && typeof this.renderer === 'string' && typeof this.rendererFilename === 'string',
      },
      {
        type: 'input',
        name: 'provider',
        message: 'Enter the Provider name:',
        default: this.provider,
        when: ({ enabled }) => enabled || !this.options.composite,
      },
      {
        type: 'input',
        name: 'filename',
        message: 'Enter the Provider filename:',
        default: this.filename,
        when: ({ enabled }) => enabled || !this.options.composite,
      },
    ]).then(({ enabled, provider, filename }) => {
      this.enabled = enabled;
      if (this.enabled || !this.options.composite) {
        this.provider = _.upperFirst(_.camelCase(provider));
        this.filename = filename.endsWith('.js') ? filename : `${filename}.js`;
        this.config.set('provider', this.provider);
        this.config.set('providerFilename', this.filename);
      } else {
        this.config.set('provider', null);
        this.config.set('providerFilename', null);
      }
    });
  }

  writing() {
    if (this.enabled || !this.options.composite) {
      const typesFilename = this.options.typesFilename || this.config.get('typesFilename');
      this.fs.copyTpl(
        this.templatePath('provider.js'),
        this.destinationPath(this.filename),
        {
          renderer: this.renderer,
          rendererResolve: this.rendererFilename.slice(0, -3),
          provider: this.provider,
          typesResolve: typesFilename.slice(0, -3),
        },
      );
    }
  }
}
