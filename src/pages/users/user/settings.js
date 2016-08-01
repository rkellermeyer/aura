import state from 'app-state';

export class UpdateUser {
  state = state;
  /**
   *   description
   */
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
