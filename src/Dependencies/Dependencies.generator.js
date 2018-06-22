import Generator from 'yeoman-generator';

export default class Dependencies extends Generator {
  packages = [
    'react@16.4.1',
    'react-dom@16.4.1',
    'react-reconciler@0.12.0',
    'fbjs@0.8.17',
    'prop-types@15.6.2',
    'lodash@4.17.10',
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
