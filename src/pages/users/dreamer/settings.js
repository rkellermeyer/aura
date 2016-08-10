import state from 'app-state';
import portal from 'app-portal';

export class UpdateUser {
  state = state;
  canActivate() {
    portal.setConfig('portalContext', 'default')
  }
  activate(params, config) {
    state.authorize( authorized => {
      this.authorized = state.authorized
    });
  }

  deactivate() {
  }

  enablePersonalTitle(config) {
    // console.log(config)
    // state.portal.setConfig('enablePersonalTitle', !config.enablePersonalTitle);
  }
}
