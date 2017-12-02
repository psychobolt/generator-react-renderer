import Generator from 'yeoman-generator';

export default class Dependencies extends Generator {
  packages = [
    'react@16.1.1',
    'react-dom@16.1.1',
    'react-reconciler@0.7.0',
    'fbjs@0.8.16',
    'prop-types@15.6.0',
  ];
  enabled = true;
  yarn = false;

  prompting() {
    return this.prompt([
      {
        type: 'confirm',
        name: 'enabled',
        message: 'Do you want to install dependencies?',
        default: this.enabled,
      },
      {
        type: 'confirm',
        name: 'yarn',
        message: 'Are you using Yarn for your project?',
        when: ({ enabled }) => enabled,
        default: this.yarn,
      },
    ]).then(({ enabled, yarn }) => {
      this.enabled = enabled;
      this.yarn = yarn;
    });
  }

  installing() {
    if (this.enabled) {
      if (this.yarn) {
        this.yarnInstall(this.packages);
      } else {
        this.npmInstall(this.packages);
      }
    }
  }
}
