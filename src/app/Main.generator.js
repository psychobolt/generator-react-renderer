import Generator from 'yeoman-generator';

export default class Main extends Generator {
  initializing() {
    const options = { composite: true };
    this.composeWith(require.resolve('../Types'), options);
    this.composeWith(require.resolve('../Renderer'), options);
    this.composeWith(require.resolve('../Container'), options);
    this.composeWith(require.resolve('../Module'), options);
    this.composeWith(require.resolve('../Dependencies'), options);
  }
}
