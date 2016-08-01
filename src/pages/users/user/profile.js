import {inject} from 'aurelia-framework';
import state from 'app-state';

export class UserProfile {
  heading = 'User Profile';

  activate(params, config) {
    this.subscription = state.configurePortal({
      title: 'Profile'
    })

    state.authorize(authorized => {
      this.user    = authorized;
      this.profile = authorized.user_profile;
    })
  }

  deactivate() {
    this.subscription.dispose();
  }
}
