import {inject} from 'aurelia-framework';
import state from 'app-state';

export class UserProfile {
  heading = 'User Profile';

  activate(params, config) {
    state.authorize(authorized => {
      this.user    = authorized;
      this.profile = authorized.user_profile;
    })
  }
}
