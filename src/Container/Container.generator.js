import Generator from 'yeoman-generator';
import _ from 'lodash';

export default class Container extends Generator {
  enabled = true;
  container = 'CustomContainer';
  filename = 'container.js';

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
        message: 'Do you want to generate a component Container?',
        default: this.enabled,
        when: this.options.composite === true && typeof this.renderer === 'string' && typeof this.rendererFilename === 'string',
      },
      {
        type: 'input',
        name: 'container',
        message: 'Enter the container name:',
        default: this.container,
        when: ({ enabled }) => enabled || !this.options.composite,
      },
      {
        type: 'input',
        name: 'filename',
        message: 'Enter the Container filename:',
        default: this.filename,
        when: ({ enabled }) => enabled || !this.options.composite,
      },
    ]).then(({ enabled, container, filename }) => {
      this.enabled = enabled;
      if (this.enabled) {
        this.container = _.upperFirst(_.camelCase(container));
        this.filename = filename.endsWith('.js') ? filename : `${filename}.js`;
        this.config.set('container', this.container);
        this.config.set('containerFilename', this.filename);
      } else {
        this.config.set('container', null);
        this.config.set('containerFilename', null);
      }
    });
  }

  writing() {
    if (this.enabled) {
      const typesFilename = this.options.typesFilename || this.config.get('typesFilename');
      const provider = this.options.provider || this.config.get('provider');
      const providerFilename = this.options.providerFilename || this.config.get('providerFilename');
      this.fs.copyTpl(
        this.templatePath('container.js'),
        this.destinationPath(this.filename),
        {
          container: this.container,
          renderer: this.renderer,
          rendererResolve: this.rendererFilename.slice(0, -3),
          typesResolve: typesFilename.slice(0, -3),
          provider,
          providerResolve: providerFilename.slice(0, -3),
        },
      );
    }
  }
}
