import {computedFrom} from 'aurelia-binding';
import {StateEvent} from 'core/actions';
import state from 'app-state';


export class Portal {

  state = {};

  config = {
    enablePersonalTitle: false,
    asideExpanded: false,
    portalContext: 'default'
  };

  constructor() {
    this.defaultState = this.state;
    let config = state.__cacheGetItem('portal.config') || {};
    Object.assign(this.config, config);
    state.__cacheSetItem('portal.config', this.config);
  }

  expandAside() {
    this.sideExpanded = true;
  }

  setState(options) {
    this.state = options;
  }

  setConfig(key, value) {
    this.config[key] = value;
    let cache = state.__cacheGetItem('portal.config') || this.config

    Object.keys(cache).forEach(k => {
      if (cache[k] !== undefined) {
        cache[k] = this.config[k]
      }
    })

    state.__cacheSetItem('portal.config', this.config);
  }

  getConfig(key) {
    return this.config[key];
  }
}

export class PortalState extends StateEvent {}
export default state.register('portal', Portal, PortalState);

