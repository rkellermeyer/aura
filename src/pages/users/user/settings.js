import state from 'app-state';

export class UpdateUser {
  state = state;
  /**
   *   description
   */
  activate(params, config) {
    this.subscription = state.configurePortal({
      title: 'Settings'
    })

    state.authorize( authorized => {
      this.authorized = state.authorized
    });
  }

  deactivate() {
    this.subscription.dispose();
  }

  enablePersonalTitle(config) {
    // console.log(config)
    // state.portal.setConfig('enablePersonalTitle', !config.enablePersonalTitle);
  }
}
