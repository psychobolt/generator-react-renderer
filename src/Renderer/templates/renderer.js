import Reconciler from 'react-reconciler';
import invariant from 'fbjs/lib/invariant';

import TYPES from './<%= typesResolve %>';

export function getTypes(instanceFactory) {
  return (type, { children, ...rest }, container) => {
    const TYPE = instanceFactory[type];
    return TYPE && TYPE(rest, container, children);
  };
}

const createInstance = getTypes(TYPES);

const defaultHostConfig = {
  getRootHostContext(rootHostContext) {
    return rootHostContext;
  },
  getChildHostContext(parentHostContext, type, instance) {
    return parentHostContext;
  },
  getPublicInstance(instance) {
    return instance;
  },
  createInstance,
  appendInitialChild(parent, child) {
    invariant(false, 'appendInitialChild is NOOP. Make sure you implement it.');
  },
  finalizeInitialChildren(instance, type, props) {
    return true;
  },
  prepareUpdate(instance, type, oldProps, newProps, container, hostContext) {
    invariant(false, 'prepareUpdate is NOOP. Make sure you implement it or return a truthy value.');
  },
  shouldSetTextContent(type, props) {
    invariant(false, 'shouldSetTextContent is NOOP. Make sure you implement it or return false.');
  },
  shouldDeprioritizeSubtree(type, props) {
    return false;
  },
  createTextInstance(text, paper, hostContext, internalInstanceHandle) {
    invariant(false, 'createTextInstance is NOOP. Make sure you implement it or return text.');
  },
  scheduleDeferredCallback: window.requestIdleCallback,
  prepareForCommit() {
  },
  resetAfterCommit() {
  },
  useSyncScheduling: true,
  now: Date.now,
  mutation: {
    commitUpdate(instance, updatePayload, type, oldProps, newProps, internalInstanceHandle) {
      invariant(false, 'commitUpdate is NOOP. Make sure you implement it.');
    },
    commitMount(instance, type, newProps, internalInstanceHandle) {
    },
    commitTextUpdate(instance, type, newProps, internalInstanceHandle) {
    },
    resetTextContent(insntace) {
    },
    appendChild(parent, child) {
      invariant(false, 'appendChild is NOOP. Make sure you implement it.');
    },
    appendChildToContainer(container, child) {
    },
    insertBefore(parent, child, beforeChild) {
    },
    insertInContainer(container, child, beforeChild) {
    },
    removeChild(parent, child) {
      invariant(false, 'removeChild is NOOP. Make sure you implement it.');
    },
    removeChildFromContainer(container, child) {
      invariant(false, 'removeChildFromContainer is NOOP. Make sure you implement it.');
    },
  },
};

export default class <%= renderer %> {
  defaultHostConfig = defaultHostConfig;
  defaultTypes = TYPES;

  constructor() {
    const instanceFactory = this.getInstanceFactory();
    let hostConfig = this.getHostConfig();
    if (this.defaultTypes !== instanceFactory) {
      this.createInstance = getTypes(instanceFactory);
      hostConfig = {
        ...hostConfig,
        createInstance: this.createInstance,
      };
    } else {
      this.createInstance = createInstance;
    }
    this.reconciler = Reconciler(hostConfig);
  }

  getInstanceFactory() {
    return this.defaultTypes;
  }

  getHostConfig() {
    return this.defaultHostConfig;
  }
}
