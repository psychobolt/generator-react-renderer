import React from 'react';
import PropTypes from 'prop-types';

import <%= renderer %> from './<%= rendererResolve %>';
import <%= container %> from './<%= containerResolve %>';
import { CONSTANTS } from './<%= typesResolve %>';

export const Context = React.createContext();

export default class <%= provider %> extends React.Component {
  static propTypes = {
    renderer: PropTypes.oneOfType([<%= renderer %>]),
    mergeProps: PropTypes.func,
    innerRef: PropTypes.instanceOf(Object),
    children: PropTypes.node,
  }

  static defaultProps = {
    renderer: <%= renderer %>,
    mergeProps: null,
    innerRef: null,
    children: null,
  }

  constructor(props) {
    super(props);
    const Renderer = props.renderer;
    this.renderer = new Renderer();
    this.state = {
      container: this.renderer.createInstance(CONSTANTS.Container, {}),
      mergeProps: props.mergeProps || (mergeProps => this.setState(mergeProps(this.state, props))),
    };
  }

  render() {
    const { innerRef, children, ...rest } = this.props;
    return (
      <<%= container %> {...rest} {...this.state} ref={innerRef} renderer={this.renderer}>
        <Context.Provider value={this.state}>{children}</Context.Provider>
      </<%= container %>>
    );
  }
}
