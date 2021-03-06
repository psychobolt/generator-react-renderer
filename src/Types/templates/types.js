import invariant from 'fbjs/lib/invariant';

export const CONSTANTS = {
  /*
    Add your own contants here.
    schema - KEY: string
    e.g MyType: 'MyType'
  */
  Container: 'Container',
};

/* eslint-disable no-unused-vars */

export default {
  /*
    Add your own instance factories here.
    schema - KEY: (props, container, children) => any
    e.g. [CONSTANT.MyType]: (props, container, children) => new container.MyType(props),
  */
  [CONSTANTS.Container]: (props, container, children) => invariant(false, 'Container factory is NOOP. Make sure you implement it.'),
};

/* eslint-enable no-unused-vars */

export const {
  /*
    Export your types here.
    e.g. MyType,
  */
  Container,
} = CONSTANTS;
