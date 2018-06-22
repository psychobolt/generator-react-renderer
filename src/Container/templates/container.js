import React from 'react';
import PropTypes from 'prop-types';

import <%= renderer %> from './<%= rendererResolve %>';
<% if (provider) { -%>import <%= provider %> from './<%= providerResolve %>';<% } %>
import { CONSTANTS } from './<%= typesResolve %>';

class <%= container %> extends React.Component {
  static propTypes = {
    renderer: PropTypes.instanceOf(<%= renderer %>).isRequired,
    container: PropTypes.instanceOf(Object),
    children: PropTypes.node,
  }

  static defaultProps = {
    container: null,
    children: null,
  }

  constructor(props, context) {
    super(props, context);
    const { renderer, container = renderer.createInstance(CONSTANTS.Container, {}) } = this.props;
    this.mountNode = renderer.reconciler.createContainer(container);
  }

  componentDidMount() {
    this.update();
  }

  componentDidUpdate() {
    this.update();
  }

  componentWillUnmount() {
    this.props.renderer.reconciler.updateContainer(null, this.mountNode, this);
  }

  update = () => {
    const { renderer, children } = this.props;
    renderer.reconciler.updateContainer(children, this.mountNode, this);
  }

  render() {
    return null;
  }
}

<% if (!provider) { -%>const Container = ({ renderer = new <%= renderer %>(), ...props }) =>
  <<%= container %> {...props} renderer={renderer} />;
Container.propTypes = {
  renderer: PropTypes // eslint-disable-line react/require-default-props
    .instanceOf(<%= container %>),
};
<% } %>
export default <% if (provider) { -%>React.forwardRef((props, ref) => <<%= provider %> {...props} innerRef={ref} />)<% } else { %>Container<% } %>;
