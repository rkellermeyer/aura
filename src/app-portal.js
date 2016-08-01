import {computedFrom} from 'aurelia-binding';
import {StateEvent} from 'core/actions';
import state from 'app-state';

export class Portal {

  state = {};

  config = {
    enablePersonalTitle: false,
  };

  authorized = null;

  defaultTitle = 'Portal';

  constructor() {
    this.defaultState = this.state;
    this.config = state.__cacheGetItem('portal.config') || {};

    state.authorize(authorized => {
      this.authorized = authorized;
      this.state.authorized = this.defaultState.authorized = authorized;
    });
  }

  @computedFrom('defaultTitle')
  get title() {
    console.log(t, this.config.enablePersonalTitle)
    return
  }

  getTitle(enabledName, authorized, otherTitle) {
    if (enabledName && authorized && otherTitle === 'Portal') {
      return authorized.user_profile.first_name || authorized.user_profile.first_name;
    }
    return otherTitle;
  }

  setState(options) {
    this.state = options;
  }

  setConfig(key, value) {
    this.config[key] = value;
    let cache = state.__cacheGetItem('portal.config');
    console.log(key, value);

    Object.keys(cache).forEach(k => {
      if (cache[k] !== undefined) {
        cache[k] = this.config[k]
      }
    })
  }

  getConfig(key) {
    return this.config[key];
  }
}

export class PortalState extends StateEvent {}
export default state.register('portal', Portal, PortalState);

