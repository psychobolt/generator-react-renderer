import React from 'react';
import PropTypes from 'prop-types';

import <%= renderer %> from './<%= rendererResolve %>';
import { CONSTANTS } from './<%= typesResolve %>';

export default class <%= container %> extends React.Component {
  static propTypes = {
    renderer: PropTypes.instanceOf(<%= renderer %>),
    children: PropTypes.node,
  };

  static defaultProps = {
    renderer: <%= renderer %>,
    children: null,
  };

  static childContextTypes = {
    container: PropTypes.object.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    const Renderer = this.props.renderer;
    const renderer = new Renderer();
    const { reconciler } = renderer;
    this.container = renderer.createInstance(CONSTANTS.Container, {});
    const node = reconciler.createContainer(this.container);
    this.update = () => {
      const { children } = this.props;
      renderer.updateContainer(children, node, this);
    };
    this.unmount = () => {
      renderer.updateContainer(null, node, this);
    };
  }

  getChildContext() {
    return { container: this.container };
  }

  componentDidMount() {
    this.update();
  }

  componentDidUpdate() {
    this.update();
  }

  componentWillUnmount() {
    this.unmount();
  }

  render() {
    return null;
  }
}
