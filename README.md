# Generator React Renderer

[![Stability](https://img.shields.io/badge/Stability-Experimental-Orange.svg)](https://nodejs.org/api/documentation.html#documentation_stability_index)
[![npm](https://img.shields.io/npm/v/@psychobolt/generator-react-renderer.svg)](https://www.npmjs.com/package/@psychobolt/generator-react-renderer)
[![Build Status](https://travis-ci.org/psychobolt/generator-react-renderer.svg?branch=master)](https://travis-ci.org/psychobolt/generator-react-renderer)

[![Dependencies Status](https://david-dm.org/psychobolt/generator-react-renderer.svg)](https://david-dm.org/psychobolt/generator-react-renderer)
[![Dev Dependencies Status](https://david-dm.org/psychobolt/generator-react-renderer/dev-status.svg)](https://david-dm.org/psychobolt/generator-react-renderer?type=dev)

Yeoman generator for scaffolding extensible ES6 React Fiber renderers. NOTE: Includes a synchronous and experimental configuration of React reconciler, which is currently being used for my React renderer libraries. 

## Install

```sh
npm install -g @psychobolt/generator-react-renderer
# or
yarn global add @psychobolt/generator-react-renderer
```

## Usage

With [yo](https://www.npmjs.com/package/yo):
```sh
yo @psychobolt/react-renderer # (Recommended) Runs all sub generators - see section bellow.
```

### Sub Generators

#### Types

Scaffolds a Instance factory template to be invoked in Reconciler's [createInstance](src/Renderer/templates/renderer.js#L14).
```sh
yo @psychobolt/react-renderer:Types 
```

#### Component

Scaffolds a file that exports helper functions for [renderer](#renderer).
```sh
yo @psychobolt/react-renderer:Component
```

#### Renderer

Scaffolds a React ES6 Renderer class. 
```sh
yo @psychobolt/react-renderer:Renderer types.js component.js
```

ES6 class Renderer allows third-party extensions.
```jsx
import React from 'React';
import Renderer from './renderer'

import MyCustomType from './MyCustomType';

export default class MyCustomRenderer extends Renderer {
  getInstanceFactory() {
    return {
      ...this.defaultTypes,
      [MyCustomType.TYPE_NAME]: (props, container) => new MyCustomType(props),
    };
  }
}
```

#### Container

Scaffolds a ES6 class Component Container which forwards the children node to the default renderer.
```sh
yo @psychobolt/react-renderer:Container CustomRenderer renderer.js types.js
```

You can override the default renderer.
```jsx
import CustomContainer from './container'
import MyCustomType from './MyCustomType';

import MyCustomRenderer from './MyCustomRenderer'

export default () => (
  <CustomContainer renderer={MyCustomRenderer}>
    <MyCustomType />
  </CustomContainer>
);
```

#### Provider

Enables forwarding of the [context](https://reactjs.org/docs/context.html), including container object, to child nodes.

```sh
yo @psychobolt/react-renderer:Provider CustomRenderer renderer.js types.js
```

Opt-in child nodes with the context: 

```jsx
import CustomContainer from './container';
import { Context } from './provider';

import MyCustomType from './MyCustomType';

export default () => (
  <CustomContainer>
    <Context.Consumer>
      {({ container }) => <MyCustomType container={containter} />}
    </Context.Consumer>
  </CustomContainer>
);
```

#### Module

Organizes scripts into a module.
```sh
# without Container
yo @psychobolt/react-renderer:Module CustomRenderer renderer.js types.js component.js
# with Container
yo @psychobolt/react-renderer:Module CustomRenderer renderer.js types.js component.js CustomContainer container.js
# with Provider
yo @psychobolt/react-renderer:Module CustomRenderer renderer.js types.js component.js CustomContainer container.js CustomProvider provider.js
```

#### Dependencies

Installs NPM dependencies. See [packages](src/Dependencies/Dependencies.generator.js#L4).
```sh
yo @psychobolt/react-renderer:Dependencies
```