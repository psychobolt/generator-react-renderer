# Generator React Renderer

[![Build Status](https://travis-ci.org/psychobolt/generator-react-renderer.svg?branch=master)](https://travis-ci.org/psychobolt/generator-react-renderer)
[![Dependencies Status](https://david-dm.org/psychobolt/generator-react-renderer.svg)](https://david-dm.org/psychobolt/generator-react-renderer)

Yeoman generator for scaffolding extensible ES6 React Fiber renderers. NOTE: Includes a synchronous and experimental configuration of React reconciler, which is currently being used for my React renderer libraries. 

## Install

```sh
npm install @psychobolt/generator-react-renderer
```

## Usage

With [yo](https://www.npmjs.com/package/yo):
```sh
yo @psychobolt/react-renderer # (Recommended) Runs all sub generators - see section bellow.
```

### Sub Generators

#### Types

Scaffolds a Instance factory template that called be on Reconciler hostConfig's [createInstance](src/Renderer/templates/renderer.js#L13).
```sh
yo @psychobolt/react-renderer:Types 
```

#### Component

Scaffolds a file that exports helper functions for renderer.
```sh
yo @psychobolt/react-renderer:Component
```

#### Renderer

Scaffolds a React ES6 Renderer class. 
```sh
yo @psychobolt/react-renderer:Renderer types.js component.js
```

ES6 class Renderer allows third-party extensions.
```js
// ./MyCustomRenderer/index.js
import React from 'React';
import Renderer from './renderer.js'

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

Scaffolds a ES6 class Component Container which forwards the children node to the default renderer and exposes the container instance as a child [context](https://reactjs.org/docs/context.html).
```sh
yo @psychobolt/react-renderer:Container CustomRenderer renderer.js types.js
```

You can override the default renderer.
```js
import CustomContainer from './container.js'
import MyCustomType from './MyCustomType';

import MyCustomRenderer from './MyCustomRenderer'

export default () => (
  <CustomContainer renderer={MyCustomRenderer}>
    <MyCustomType />
  </CustomContainer>
);
```

#### Module

Organizes scripts into a module.
```sh
# without Container
yo @psychobolt/react-renderer:Module CustomRenderer Custom.renderer.js Custom.types.js component.js
# with Container
yo @psychobolt/react-renderer:Module CustomRenderer Custom.renderer.js types.js component.js CustomContainer Custom.container.js
```

#### Dependencies

Installs NPM dependencies. See [packages](src/Dependencies/Dependencies.generator.js#L4).
```sh
yo @psychobolt/react-renderer:Dependencies
```