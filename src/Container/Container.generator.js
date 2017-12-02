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
        when: typeof this.renderer === 'string' && typeof this.rendererFilename === 'string',
      },
      {
        type: 'input',
        name: 'container',
        message: 'Enter the container name:',
        default: this.container,
        when: ({ enabled }) => enabled,
      },
      {
        type: 'input',
        name: 'filename',
        message: 'Enter the Container filename:',
        default: this.filename,
        when: ({ enabled }) => enabled,
      },
    ]).then(({ enabled, container, filename }) => {
      this.enabled = enabled;
      if (this.enabled) {
        this.container = _.upperFirst(_.camelCase(container));
        this.filename = filename.endsWith('.js') ? filename : `${filename}.js`;
        this.config.set('container', this.container);
        this.config.set('containerFilename', this.filename);
      }
    });
  }

  writing() {
    if (this.enabled) {
      const typesFilename = this.options.typesFilename || this.config.get('typesFilename');
      this.fs.copyTpl(
        this.templatePath('container.js'),
        this.destinationPath(this.filename),
        {
          container: this.container,
          renderer: this.renderer,
          rendererResolve: this.rendererFilename.slice(0, -3),
          typesResolve: typesFilename.slice(0, -3),
        },
      );
    }
  }
}
